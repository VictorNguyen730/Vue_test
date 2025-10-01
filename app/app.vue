<template>
  <div class="min-h-screen bg-white p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <h1 class="text-2xl font-semibold text-gray-900">Учетные записи</h1>
          <div class="flex items-center gap-2 text-sm text-gray-500">
            <span>{{ accountStore.accounts.length }}</span>
            <span>{{ accountStore.accounts.length === 1 ? 'запись' : accountStore.accounts.length < 5 ? 'записи' : 'записей' }}</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <!-- Search Input -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Поиск по логину или меткам..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
            />
            <svg class="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <!-- Add Button -->
          <button 
            @click="addNewAccount"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
            type="button"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Добавить
          </button>
        </div>
      </div>

      <!-- Statistics Panel -->
      <div v-if="accountStore.accounts.length > 0" class="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm text-blue-600 font-medium">Всего записей</p>
              <p class="text-2xl font-bold text-blue-900">{{ accountStats.total }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm text-green-600 font-medium">Локальные</p>
              <p class="text-2xl font-bold text-green-900">{{ accountStats.local }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-purple-100 rounded-lg">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm text-purple-600 font-medium">LDAP</p>
              <p class="text-2xl font-bold text-purple-900">{{ accountStats.ldap }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tooltip Info -->
      <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
          <div>
            <p class="text-blue-800 text-sm font-medium mb-1">
              Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
            </p>
           
          </div>
        </div>
      </div>

      <!-- Accounts List -->
      <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <!-- Header Row -->
        <div class="grid grid-cols-[2fr_1fr_1.5fr_1.5fr_auto] gap-2 md:gap-4 p-3 md:p-4 bg-gray-50 border-b border-gray-200 text-xs md:text-sm font-medium text-gray-700">
          <div class="flex items-center">Метки</div>
          <div class="flex items-center">Тип записи</div>
          <div class="flex items-center">Логин</div>
          <div class="flex items-center">Пароль</div>
          <div class="flex items-center justify-center w-12 md:w-16">Действия</div>
        </div>

        <!-- Account Rows -->
        <div v-if="filteredAccounts.length === 0 && accountStore.accounts.length === 0" class="p-8 text-center text-gray-500">
          <div class="flex flex-col items-center gap-4">
            <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <div>
              <p class="text-lg font-medium text-gray-900">Нет учетных записей</p>
              <p class="text-gray-500">Нажмите "Добавить" для создания новой записи</p>
            </div>
          </div>
        </div>
        <div v-else-if="filteredAccounts.length === 0 && accountStore.accounts.length > 0" class="p-8 text-center text-gray-500">
          <div class="flex flex-col items-center gap-4">
            <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <div>
              <p class="text-lg font-medium text-gray-900">Ничего не найдено</p>
              <p class="text-gray-500">Попробуйте изменить поисковый запрос</p>
            </div>
          </div>
        </div>
        <div v-else>
          <TransitionGroup name="account" tag="div">
            <AccountRow 
              v-for="account in filteredAccounts" 
              :key="account.id" 
              :account="account"
            />
          </TransitionGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useAccountStore } from '../stores/account'
import AccountRow from '../components/AccountRow.vue'
import type { Account } from '../types/account'

const accountStore = useAccountStore()
const searchQuery = ref('')

// Initialize store on mount
onMounted(() => {
  accountStore.initStore()
})

// Account statistics
const accountStats = computed(() => accountStore.getAccountStats())

// Filtered accounts based on search query
const filteredAccounts = computed(() => {
  if (!searchQuery.value.trim()) {
    return accountStore.accounts
  }
  
  const query = searchQuery.value.toLowerCase()
  return accountStore.accounts.filter((account: Account) => {
    // Search in login
    if (account.login.toLowerCase().includes(query)) {
      return true
    }
    
    // Search in labels
    const labelTexts = account.label.map(l => l.text.toLowerCase())
    if (labelTexts.some(text => text.includes(query))) {
      return true
    }
    
    return false
  })
})

// Add new account
const addNewAccount = () => {
  accountStore.addAccount()
  // Scroll to the newly added account after a short delay
  setTimeout(() => {
    const lastRow = document.querySelector('.account-row:last-child')
    if (lastRow) {
      lastRow.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, 100)
}
</script>

<style>
/* Custom styles for the account management form */
.form-input {
  @apply px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

.form-input-error {
  @apply border-red-500 focus:ring-red-500;
}

.form-select {
  @apply px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white;
}

.form-select-error {
  @apply border-red-500 focus:ring-red-500;
}

.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors;
}

.btn-danger {
  @apply px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors;
}

.tooltip {
  @apply relative cursor-help;
}

.tooltip-text {
  @apply absolute z-10 w-64 p-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible transition-all duration-200;
}

.tooltip:hover .tooltip-text {
  @apply opacity-100 visible;
}

.password-dots {
  @apply font-mono tracking-widest;
  letter-spacing: 0.2em;
  font-size: 18px;
  line-height: 1;
}

/* Transition animations */
.account-enter-active,
.account-leave-active {
  transition: all 0.3s ease;
}

.account-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.account-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.account-move {
  transition: transform 0.3s ease;
}

/* Smooth focus transitions */
input:focus,
select:focus {
  transition: all 0.2s ease;
}

/* Button hover effects */
button {
  transition: all 0.2s ease;
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
