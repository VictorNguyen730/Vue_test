import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import type { Account, AccountFormData, AccountState, ValidationError, Label } from '../types/account'

export const useAccountStore = defineStore('account', {
  state: (): AccountState => ({
    accounts: [],
    validationErrors: {}
  }),

  actions: {
    // Initialize store and load from localStorage
    initStore() {
      if (process.client) {
        const savedAccounts = localStorage.getItem('accounts')
        if (savedAccounts) {
          try {
            this.accounts = JSON.parse(savedAccounts)
          } catch (error) {
            console.error('Error loading accounts from localStorage:', error)
          }
        }
      }
    },

    // Save accounts to localStorage
    saveToStorage() {
      if (process.client) {
        localStorage.setItem('accounts', JSON.stringify(this.accounts))
      }
    },

    // Convert label string to array of label objects
    processLabel(labelString: string): Label[] {
      if (!labelString.trim()) return []
      
      return labelString
        .split(';')
        .map(text => text.trim())
        .filter(text => text.length > 0)
        .map(text => ({ text }))
    },

    // Validate account fields
    validateAccount(formData: AccountFormData): ValidationError[] {
      const errors: ValidationError[] = []

      // Validate label (max 50 characters)
      if (formData.label.length > 50) {
        errors.push({
          field: 'label',
          message: 'Метка не должна превышать 50 символов'
        })
      }

      // Validate login (required, max 100 characters)
      if (!formData.login.trim()) {
        errors.push({
          field: 'login',
          message: 'Логин обязателен для заполнения'
        })
      } else if (formData.login.length > 100) {
        errors.push({
          field: 'login',
          message: 'Логин не должен превышать 100 символов'
        })
      }

      // Validate password (required for Local type, max 100 characters)
      if (formData.recordType === 'Local') {
        if (!formData.password.trim()) {
          errors.push({
            field: 'password',
            message: 'Пароль обязателен для локальных учетных записей'
          })
        } else if (formData.password.length > 100) {
          errors.push({
            field: 'password',
            message: 'Пароль не должен превышать 100 символов'
          })
        }
      }

      return errors
    },

    // Add new account
    addAccount(): string {
      const newAccountId = nanoid()
      const newAccount: Account = {
        id: newAccountId,
        label: [],
        recordType: 'Local',
        login: '',
        password: ''
      }
      
      this.accounts.push(newAccount)
      this.saveToStorage()
      return newAccountId
    },

    // Update account
    updateAccount(formData: AccountFormData): boolean {
      const errors = this.validateAccount(formData)
      
      // Update validation errors
      if (errors.length > 0) {
        this.validationErrors[formData.id] = errors
        return false
      } else {
        // Clear validation errors for this account
        delete this.validationErrors[formData.id]
      }

      // Find and update the account
      const accountIndex = this.accounts.findIndex(acc => acc.id === formData.id)
      if (accountIndex !== -1) {
        const processedAccount: Account = {
          id: formData.id,
          label: this.processLabel(formData.label),
          recordType: formData.recordType,
          login: formData.login,
          password: formData.recordType === 'LDAP' ? null : formData.password
        }
        
        this.accounts[accountIndex] = processedAccount
        this.saveToStorage()
        return true
      }
      
      return false
    },

    // Delete account
    deleteAccount(accountId: string) {
      const accountIndex = this.accounts.findIndex(acc => acc.id === accountId)
      if (accountIndex !== -1) {
        this.accounts.splice(accountIndex, 1)
        delete this.validationErrors[accountId]
        this.saveToStorage()
      }
    },

    // Get account by ID
    getAccountById(accountId: string): Account | undefined {
      return this.accounts.find(acc => acc.id === accountId)
    },

    // Convert Account to AccountFormData for editing
    accountToFormData(account: Account): AccountFormData {
      return {
        id: account.id,
        label: account.label.map(l => l.text).join('; '),
        recordType: account.recordType,
        login: account.login,
        password: account.password || ''
      }
    },

    // Clear validation errors for a specific account
    clearValidationErrors(accountId: string) {
      delete this.validationErrors[accountId]
    },

    // Get account statistics
    getAccountStats() {
      const localAccounts = this.accounts.filter(acc => acc.recordType === 'Local').length
      const ldapAccounts = this.accounts.filter(acc => acc.recordType === 'LDAP').length
      const totalLabels = this.accounts.reduce((sum, acc) => sum + acc.label.length, 0)
      
      return {
        total: this.accounts.length,
        local: localAccounts,
        ldap: ldapAccounts,
        totalLabels
      }
    },

    // Bulk delete accounts
    bulkDeleteAccounts(accountIds: string[]) {
      accountIds.forEach(id => {
        const index = this.accounts.findIndex(acc => acc.id === id)
        if (index !== -1) {
          this.accounts.splice(index, 1)
          delete this.validationErrors[id]
        }
      })
      this.saveToStorage()
    },

    // Export accounts to JSON
    exportAccounts() {
      return JSON.stringify(this.accounts, null, 2)
    },

    // Import accounts from JSON
    importAccounts(jsonData: string) {
      try {
        const importedAccounts = JSON.parse(jsonData)
        if (Array.isArray(importedAccounts)) {
          // Add imported accounts with new IDs
          importedAccounts.forEach(account => {
            const newAccount = {
              ...account,
              id: nanoid()
            }
            this.accounts.push(newAccount)
          })
          this.saveToStorage()
          return true
        }
        return false
      } catch (error) {
        console.error('Error importing accounts:', error)
        return false
      }
    }
  }
})