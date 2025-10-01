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
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.header {
  margin-bottom: 32px;
}

.title-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 24px 32px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.main-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.add-button {
  width: 64px;
  height: 64px;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
  position: relative;
  overflow: hidden;
}

.add-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.add-button:hover::before {
  opacity: 1;
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.6);
}

.add-button:active {
  transform: translateY(0);
}

.plus-icon {
  font-size: 28px;
  font-weight: 300;
  color: white;
  position: relative;
  z-index: 1;
}

.info-bar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px 24px;
  border-left: 4px solid #667eea;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.info-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.info-icon {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.info-text {
  color: #4a5568;
  font-size: 15px;
  line-height: 1.5;
  font-weight: 500;
}

/* Step 2: Table Structure Styles */
.table-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr 1.5fr 80px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
}

.header-cell {
  padding: 20px 16px;
  font-weight: 600;
  color: #2d3748;
  font-size: 14px;
  border-right: 1px solid rgba(226, 232, 240, 0.5);
  letter-spacing: 0.025em;
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
  background: transparent;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr 1.5fr 80px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.table-row:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.02) 0%, rgba(118, 75, 162, 0.02) 100%);
  transform: translateY(-1px);
}

.table-row:last-child {
  border-bottom: none;
}

.cell {
  padding: 16px;
  display: flex;
  align-items: center;
  border-right: 1px solid rgba(226, 232, 240, 0.3);
}

.cell:last-child {
  border-right: none;
}

/* Input Field Styles */
.input-field {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(226, 232, 240, 0.8);
  border-radius: 12px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  color: #2d3748;
}

.input-field:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-1px);
}

.input-field.error {
  border-color: #e53e3e;
  box-shadow: 0 0 0 4px rgba(229, 62, 62, 0.1);
  background: rgba(254, 226, 226, 0.3);
}

.input-field::placeholder {
  color: #a0aec0;
  font-weight: 400;
}

/* Dropdown Styles */
.dropdown {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(226, 232, 240, 0.8);
  border-radius: 12px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 18px;
  padding-right: 40px;
  font-weight: 500;
  color: #2d3748;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-1px);
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
  padding: 12px 48px 12px 16px;
  border: 2px solid rgba(226, 232, 240, 0.8);
  border-radius: 12px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  letter-spacing: 1px;
  font-weight: 500;
  color: #2d3748;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.password-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-1px);
}

.password-input.error {
  border-color: #e53e3e;
  box-shadow: 0 0 0 4px rgba(229, 62, 62, 0.1);
  background: rgba(254, 226, 226, 0.3);
}

.password-toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #a0aec0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
}

.password-toggle:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  transform: scale(1.1);
}

.eye-icon {
  font-size: 18px;
}

/* Action Button Styles */
.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px;
  color: #e53e3e;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.delete-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(229, 62, 62, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.delete-button:hover::before {
  opacity: 1;
}

.delete-button:hover {
  color: #c53030;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(229, 62, 62, 0.3);
}

.delete-button:active {
  transform: translateY(0) scale(1);
}

.trash-icon {
  font-size: 18px;
  position: relative;
  z-index: 1;
}
</style>
