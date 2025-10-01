<template>
  <div class="account-manager">
    <!-- Step 1: Header and Informational Bar -->
    <div class="header">
      <div class="title-section">
        <h1 class="main-title">Учетные записи</h1>
        <button class="add-button">
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

      <!-- Step 3: Local Account Entry Rows -->
      <div class="table-body">
        <!-- Local Account Row 1 -->
        <div class="table-row">
          <div class="cell tags-cell">
            <input type="text" class="input-field" value="XXX" />
          </div>
          <div class="cell type-cell">
            <select class="dropdown">
              <option value="local">Локальная</option>
              <option value="ldap">LDAP</option>
            </select>
          </div>
          <div class="cell login-cell">
            <input type="text" class="input-field" value="Значение" />
          </div>
          <div class="cell password-cell">
            <div class="password-container">
              <input type="password" class="password-input" value="••••••••" />
              <button class="password-toggle" type="button">
                <span class="eye-icon">👁</span>
              </button>
            </div>
          </div>
          <div class="cell actions-cell">
            <button class="delete-button" type="button">
              <span class="trash-icon">🗑</span>
            </button>
          </div>
        </div>

        <!-- Local Account Row 2 -->
        <div class="table-row">
          <div class="cell tags-cell">
            <input type="text" class="input-field" value="XXX; YYYYYYYYYY; IIIIIIII; MMMMMMMMMM" />
          </div>
          <div class="cell type-cell">
            <select class="dropdown">
              <option value="local">Локальная</option>
              <option value="ldap">LDAP</option>
            </select>
          </div>
          <div class="cell login-cell">
            <input type="text" class="input-field" value="Значение" />
          </div>
          <div class="cell password-cell">
            <div class="password-container">
              <input type="password" class="password-input" value="••••••••" />
              <button class="password-toggle" type="button">
                <span class="eye-icon">👁</span>
              </button>
            </div>
          </div>
          <div class="cell actions-cell">
            <button class="delete-button" type="button">
              <span class="trash-icon">🗑</span>
            </button>
          </div>
        </div>

        <!-- Local Account Row 3 -->
        <div class="table-row">
          <div class="cell tags-cell">
            <input type="text" class="input-field" value="XXX" />
          </div>
          <div class="cell type-cell">
            <select class="dropdown">
              <option value="local">Локальная</option>
              <option value="ldap">LDAP</option>
            </select>
          </div>
          <div class="cell login-cell">
            <input type="text" class="input-field" value="Значение" />
          </div>
          <div class="cell password-cell">
            <div class="password-container">
              <input type="password" class="password-input" value="••••••••" />
              <button class="password-toggle" type="button">
                <span class="eye-icon">👁</span>
              </button>
            </div>
          </div>
          <div class="cell actions-cell">
            <button class="delete-button" type="button">
              <span class="trash-icon">🗑</span>
            </button>
          </div>
        </div>

        <!-- Step 4: LDAP Account Entry Rows -->
        <!-- LDAP Account Row 1 -->
        <div class="table-row">
          <div class="cell tags-cell">
            <input type="text" class="input-field" value="Значение" />
          </div>
          <div class="cell type-cell">
            <select class="dropdown">
              <option value="ldap">LDAP</option>
              <option value="local">Локальная</option>
            </select>
          </div>
          <div class="cell login-cell">
            <input type="text" class="input-field" value="Значение" />
          </div>
          <div class="cell password-cell">
            <!-- Empty for LDAP accounts -->
          </div>
          <div class="cell actions-cell">
            <button class="delete-button" type="button">
              <span class="trash-icon">🗑</span>
            </button>
          </div>
        </div>

        <!-- LDAP Account Row 2 -->
        <div class="table-row">
          <div class="cell tags-cell">
            <input type="text" class="input-field" value="Значение" />
          </div>
          <div class="cell type-cell">
            <select class="dropdown">
              <option value="ldap">LDAP</option>
              <option value="local">Локальная</option>
            </select>
          </div>
          <div class="cell login-cell">
            <input type="text" class="input-field" value="Значение" />
          </div>
          <div class="cell password-cell">
            <!-- Empty for LDAP accounts -->
          </div>
          <div class="cell actions-cell">
            <button class="delete-button" type="button">
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
