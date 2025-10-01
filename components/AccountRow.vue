<template>
  <div class="account-row grid grid-cols-[2fr_1fr_1.5fr_1.5fr_auto] gap-2 md:gap-4 items-start p-3 md:p-4 border-b border-gray-200 hover:bg-gray-50 transition-all duration-200">
    <!-- Label Field -->
    <div class="space-y-1">
      <input
        v-model="formData.label"
        type="text"
        placeholder="Метки"
        class="w-full px-3 py-2 h-9 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': hasFieldError('label') }"
        @blur="handleFieldUpdate('label')"
        maxlength="50"
      />
      <div v-if="hasFieldError('label')" class="text-red-500 text-xs leading-tight">
        {{ getFieldError('label') }}
      </div>
    </div>

    <!-- Record Type Field -->
    <div class="space-y-1">
      <select
        v-model="formData.recordType"
        class="w-full px-3 py-2 h-9 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200"
        :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': hasFieldError('recordType') }"
        @change="handleFieldUpdate('recordType')"
      >
        <option value="Local">Локальная</option>
        <option value="LDAP">LDAP</option>
      </select>
      <div v-if="hasFieldError('recordType')" class="text-red-500 text-xs leading-tight">
        {{ getFieldError('recordType') }}
      </div>
    </div>

    <!-- Login Field -->
    <div class="space-y-1">
      <input
        v-model="formData.login"
        type="text"
        placeholder="Логин"
        class="w-full px-3 py-2 h-9 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': hasFieldError('login') }"
        @blur="handleFieldUpdate('login')"
        maxlength="100"
        required
      />
      <div v-if="hasFieldError('login')" class="text-red-500 text-xs leading-tight">
        {{ getFieldError('login') }}
      </div>
    </div>

    <!-- Password Field -->
    <div class="space-y-1">
      <div v-if="formData.recordType === 'LDAP'" class="flex items-center px-3 py-2 h-9 text-gray-400 bg-gray-50 border border-gray-300 rounded-md text-sm">
        <span>Значение</span>
      </div>
      <div v-else class="relative">
        <!-- Password display with dots when there's a value -->
        <div v-if="formData.password && !showPassword" class="w-full px-3 py-2 h-9 text-sm border border-gray-300 rounded-md bg-white flex items-center cursor-pointer" @click="togglePasswordVisibility">
          <span class="password-dots text-lg leading-none">{{ '•'.repeat(Math.min(formData.password.length, 12)) }}</span>
        </div>
        <!-- Password input field -->
        <input
          v-else
          v-model="formData.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Пароль"
          class="w-full px-3 py-2 h-9 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 transition-all duration-200"
          :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': hasFieldError('password') }"
          @blur="handleFieldUpdate('password')"
          maxlength="100"
          required
        />
      </div>
      <div v-if="hasFieldError('password')" class="text-red-500 text-xs leading-tight">
        {{ getFieldError('password') }}
      </div>
    </div>

    <!-- Actions Column -->
    <div class="flex items-start justify-center gap-1 md:gap-2 w-12 md:w-16 pt-2">
      <!-- Password Toggle Button -->
      <button
        v-if="formData.recordType === 'Local' && formData.password"
        type="button"
        @click="togglePasswordVisibility"
        class="p-1 md:p-1.5 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors rounded"
        :title="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
      >
        <svg v-if="showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L8.464 11.293m2.829-2.829l2.828-2.828m2.829 2.829L15.536 11.293m-4.243-4.243L9.879 9.879M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
      </button>
      
      <!-- Delete Button -->
      <button
        type="button"
        @click="handleDelete"
        class="p-1 md:p-1.5 text-gray-400 hover:text-red-600 focus:outline-none focus:text-red-600 transition-colors rounded hover:bg-red-50"
        title="Удалить учетную запись"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useAccountStore } from '../stores/account'
import type { Account, AccountFormData } from '../types/account'

interface Props {
  account: Account
}

const props = defineProps<Props>()
const accountStore = useAccountStore()
const showPassword = ref(false)

// Convert account to form data
const formData = reactive<AccountFormData>(
  accountStore.accountToFormData(props.account)
)

// Watch for record type changes to handle password field
watch(() => formData.recordType, (newType) => {
  if (newType === 'LDAP') {
    formData.password = ''
    showPassword.value = false
  }
  handleFieldUpdate('recordType')
})

// Field validation helpers
const hasFieldError = (fieldName: string): boolean => {
  const errors = accountStore.validationErrors[formData.id]
  return errors?.some(error => error.field === fieldName) ?? false
}

const getFieldError = (fieldName: string): string => {
  const errors = accountStore.validationErrors[formData.id]
  const error = errors?.find(error => error.field === fieldName)
  return error?.message ?? ''
}

// Handle field updates
const handleFieldUpdate = (fieldName: string) => {
  // Clear validation errors for this field temporarily
  accountStore.clearValidationErrors(formData.id)
  
  // Update the account with validation
  accountStore.updateAccount({ ...formData })
}

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Handle account deletion with confirmation
const handleDelete = () => {
  if (confirm('Вы уверены, что хотите удалить эту учетную запись?')) {
    accountStore.deleteAccount(formData.id)
  }
}
</script>