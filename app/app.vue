<script setup>
import { ref, reactive, onMounted, watch } from 'vue'

// Интерфейс для учетной записи
interface AccountRecord {
  id: string
  tags: string
  type: 'local' | 'ldap'
  login: string
  password: string
  errors: {
    tags: boolean
    login: boolean
    password: boolean
  }
}

// Реактивное состояние
const accounts = ref<AccountRecord[]>([])

// Генерация уникального ID
const generateId = () => Math.random().toString(36).substr(2, 9)

// Добавление новой записи
const addNewRecord = () => {
  const newRecord: AccountRecord = {
    id: generateId(),
    tags: '',
    type: 'local',
    login: '',
    password: '',
    errors: {
      tags: false,
      login: false,
      password: false
    }
  }
  accounts.value.push(newRecord)
}

// Удаление записи
const deleteRecord = (id: string) => {
  const index = accounts.value.findIndex(account => account.id === id)
  if (index > -1) {
    accounts.value.splice(index, 1)
    saveToStorage()
  }
}

// Валидация полей
const validateRecord = (record: AccountRecord) => {
  const errors = {
    tags: !record.tags.trim(),
    login: !record.login.trim(),
    password: record.type === 'local' && !record.password.trim()
  }
  
  record.errors = errors
  return !Object.values(errors).some(error => error)
}

// Парсинг меток в массив объектов
const parseTags = (tagsString: string) => {
  if (!tagsString.trim()) return []
  return tagsString.split(';').map(tag => ({ text: tag.trim() })).filter(tag => tag.text)
}

// Сохранение в localStorage
const saveToStorage = () => {
  const dataToSave = accounts.value.map(account => ({
    id: account.id,
    tags: account.tags,
    type: account.type,
    login: account.login,
    password: account.password
  }))
  localStorage.setItem('accountRecords', JSON.stringify(dataToSave))
}

// Загрузка из localStorage
const loadFromStorage = () => {
  const saved = localStorage.getItem('accountRecords')
  if (saved) {
    try {
      const data = JSON.parse(saved)
      accounts.value = data.map((item: any) => ({
        ...item,
        errors: {
          tags: false,
          login: false,
          password: false
        }
      }))
    } catch (error) {
      console.error('Ошибка загрузки данных:', error)
    }
  }
}

// Обработчики событий
const onTagsBlur = (record: AccountRecord) => {
  validateRecord(record)
  saveToStorage()
}

const onLoginBlur = (record: AccountRecord) => {
  validateRecord(record)
  saveToStorage()
}

const onPasswordBlur = (record: AccountRecord) => {
  validateRecord(record)
  saveToStorage()
}

const onTypeChange = (record: AccountRecord) => {
  validateRecord(record)
  saveToStorage()
}

// Загрузка данных при монтировании
onMounted(() => {
  loadFromStorage()
  
  // Инициализация с примерами данных если нет сохраненных
  if (accounts.value.length === 0) {
    accounts.value = [
      {
        id: generateId(),
        tags: 'XXX',
        type: 'local',
        login: 'Значение',
        password: '••••••••',
        errors: { tags: false, login: false, password: false }
      },
      {
        id: generateId(),
        tags: 'XXX; YYYYYYYYYY; IIIIIIII; MMMMMMMMMM',
        type: 'local',
        login: 'Значение',
        password: '••••••••',
        errors: { tags: false, login: false, password: false }
      },
      {
        id: generateId(),
        tags: 'XXX',
        type: 'local',
        login: 'Значение',
        password: '••••••••',
        errors: { tags: false, login: false, password: false }
      },
      {
        id: generateId(),
        tags: 'Значение',
        type: 'ldap',
        login: 'Значение',
        password: '',
        errors: { tags: false, login: false, password: false }
      },
      {
        id: generateId(),
        tags: 'Значение',
        type: 'ldap',
        login: 'Значение',
        password: '',
        errors: { tags: false, login: false, password: false }
      }
    ]
  }
})
</script>

<template>
  <div class="account-manager">
    <!-- Step 1: Header and Informational Bar -->
    <div class="header">
      <div class="title-section">
        <h1 class="main-title">Учетные записи</h1>
        <button class="add-button" @click="addNewRecord">
          <span class="plus-icon">+</span>
        </button>
      </div>
      <div class="info-bar">
        <div class="info-content">
          <span class="info-icon">?</span>
          <span class="info-text">Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</span>
        </div>
      </div>
    </div>

    <!-- Step 2: Table Structure and Column Headers -->
    <div class="table-container">
      <div class="table-header">
        <div class="header-cell tags-header">Метки</div>
        <div class="header-cell type-header">Тип записи</div>
        <div class="header-cell login-header">Логин</div>
        <div class="header-cell password-header">Пароль</div>
        <div class="header-cell actions-header"></div>
      </div>

      <!-- Dynamic Account Rows -->
      <div class="table-body">
        <div 
          v-for="account in accounts" 
          :key="account.id" 
          class="table-row"
        >
          <!-- Tags Cell -->
          <div class="cell tags-cell">
            <input 
              type="text" 
              class="input-field"
              :class="{ 'error': account.errors.tags }"
              v-model="account.tags"
              @blur="onTagsBlur(account)"
              placeholder="Введите метки"
            />
          </div>
          
          <!-- Type Cell -->
          <div class="cell type-cell">
            <select 
              class="dropdown"
              v-model="account.type"
              @change="onTypeChange(account)"
            >
              <option value="local">Локальная</option>
              <option value="ldap">LDAP</option>
            </select>
          </div>
          
          <!-- Login Cell -->
          <div class="cell login-cell">
            <input 
              type="text" 
              class="input-field"
              :class="{ 'error': account.errors.login }"
              v-model="account.login"
              @blur="onLoginBlur(account)"
              placeholder="Введите логин"
            />
          </div>
          
          <!-- Password Cell -->
          <div class="cell password-cell">
            <div v-if="account.type === 'local'" class="password-container">
              <input 
                type="password" 
                class="password-input"
                :class="{ 'error': account.errors.password }"
                v-model="account.password"
                @blur="onPasswordBlur(account)"
                placeholder="Введите пароль"
              />
              <button class="password-toggle" type="button">
                <span class="eye-icon">👁</span>
              </button>
            </div>
            <!-- Empty for LDAP accounts -->
          </div>
          
          <!-- Actions Cell -->
          <div class="cell actions-cell">
            <button 
              class="delete-button" 
              type="button"
              @click="deleteRecord(account.id)"
            >
              <span class="trash-icon">🗑</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-manager {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  margin-bottom: 20px;
}

.title-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.main-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.add-button {
  width: 50px;
  height: 50px;
  border: 2px solid #007bff;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.add-button:hover {
  background: #007bff;
  color: white;
}

.plus-icon {
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
}

.add-button:hover .plus-icon {
  color: white;
}

.info-bar {
  background: #e3f2fd;
  border-radius: 8px;
  padding: 15px;
  border-left: 4px solid #2196f3;
}

.info-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-icon {
  width: 24px;
  height: 24px;
  background: #2196f3;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.info-text {
  color: #1976d2;
  font-size: 14px;
  line-height: 1.4;
}

/* Step 2: Table Structure Styles */
.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr 1.5fr 60px;
  background: #f8f9fa;
  border-bottom: 2px solid #e9ecef;
}

.header-cell {
  padding: 15px 12px;
  font-weight: 600;
  color: #495057;
  font-size: 14px;
  border-right: 1px solid #e9ecef;
}

.header-cell:last-child {
  border-right: none;
}

.tags-header {
  text-align: left;
}

.type-header {
  text-align: center;
}

.login-header {
  text-align: center;
}

.password-header {
  text-align: center;
}

.actions-header {
  text-align: center;
}

/* Step 3: Table Body and Row Styles */
.table-body {
  background: white;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr 1.5fr 60px;
  border-bottom: 1px solid #e9ecef;
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background-color: #f8f9fa;
}

.table-row:last-child {
  border-bottom: none;
}

.cell {
  padding: 12px;
  display: flex;
  align-items: center;
  border-right: 1px solid #e9ecef;
}

.cell:last-child {
  border-right: none;
}

/* Input Field Styles */
.input-field {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.input-field.error {
  border-color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
}

/* Dropdown Styles */
.dropdown {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  padding-right: 32px;
}

.dropdown:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

/* Password Field Styles */
.password-container {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}

.password-input {
  width: 100%;
  padding: 8px 40px 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  font-family: monospace;
  letter-spacing: 2px;
}

.password-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.password-input.error {
  border-color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
}

.password-toggle {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #6c757d;
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: #007bff;
}

.eye-icon {
  font-size: 16px;
}

/* Action Button Styles */
.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #dc3545;
  transition: all 0.2s ease;
  border-radius: 4px;
}

.delete-button:hover {
  background: #f8d7da;
  color: #721c24;
}

.trash-icon {
  font-size: 16px;
}
</style>
