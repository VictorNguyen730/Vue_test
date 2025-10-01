# Vue Account Management System

A comprehensive account management form built with Vue.js 3, Nuxt, TypeScript, and Pinia. This application allows users to manage account records with various types and validation.

## Features

### Core Functionality
- **Add New Accounts**: Click the "Добавить" (Add) button to create new account records
- **Account Fields**:
  - **Label**: Optional field with semicolon-separated values (max 50 characters)
  - **Record Type**: Dropdown with "Local" and "LDAP" options
  - **Login**: Required field (max 100 characters)  
  - **Password**: Required for Local accounts, hidden for LDAP (max 100 characters)
- **Delete Accounts**: Remove accounts with the trash icon (with confirmation dialog)
- **Real-time Validation**: Fields validate on blur/change with red error highlighting
- **Persistent Storage**: Accounts saved to localStorage and restored on page refresh

### Enhanced Features (NEW!)
- **🔍 Search & Filter**: Real-time search through login names and labels
- **📊 Statistics Dashboard**: Visual statistics showing total accounts, Local vs LDAP counts, and total labels
- **✨ Smooth Animations**: Beautiful transitions and hover effects throughout the interface
- **🎯 Better UX**: Enhanced visual feedback, improved empty states, and confirmation dialogs
- **🌐 Russian Localization**: All error messages and UI text in Russian
- **⚡ Performance Optimized**: Efficient filtering and smooth animations

### Technical Implementation
- **Label Processing**: Converts semicolon-separated strings to array of objects `[{text: "label1"}, {text: "label2"}]`
- **Conditional Password Field**: Password field shows/hides based on record type selection
- **Form Validation**: Client-side validation with error messages and visual feedback
- **State Management**: Pinia store with CRUD operations and validation
- **Advanced Store Features**: Statistics, bulk operations, export/import functionality
- **Vue 3 Composition API**: Modern reactive programming with computed properties and watchers

## Technology Stack

- **Framework**: Vue.js 3 with Composition API
- **Meta-framework**: Nuxt 4
- **Language**: TypeScript
- **State Management**: Pinia
- **UI Framework**: Tailwind CSS
- **Icons**: Heroicons (SVG)
- **Build Tool**: Vite
- **Package Manager**: npm

## Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd vue-account-management
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## Project Structure

```
├── app/
│   └── app.vue              # Main application component
├── components/
│   └── AccountRow.vue       # Individual account form row
├── stores/
│   └── account.ts          # Pinia store for account management  
├── types/
│   └── account.ts          # TypeScript interfaces
├── nuxt.config.ts          # Nuxt configuration
└── package.json            # Dependencies and scripts
```

## Usage Guide

### Adding Accounts
Click the "Добавить" button to add a new empty account form row.

### Filling Account Forms
1. **Labels**: Enter labels separated by semicolons (e.g., "admin; user; developer")
2. **Record Type**: Select either "Local" or "LDAP" from the dropdown
3. **Login**: Enter the login username (required field)
4. **Password**: Enter the password (required for Local accounts only)

### Form Validation
Fields validate automatically when focus is lost (on blur) or when values change. Invalid fields are highlighted in red with appropriate error messages.

### Deleting Accounts
Click the trash icon next to an account row to remove it from the list.

### Data Persistence
All account data is automatically saved to localStorage and will be restored when the page is refreshed.

## Feature Checklist

The following features have been implemented and verified:

### ✅ Original Requirements
- Vue.js 3 with Composition API
- Nuxt framework integration
- Full TypeScript implementation
- Pinia state management
- Complete account CRUD operations
- Field validation with error highlighting
- Label processing (semicolon to array conversion)
- Conditional password field based on account type
- LocalStorage persistence
- Responsive design matching original mockup
- Tooltip for label field
- Password visibility toggle

### ✅ Enhanced Features (NEW!)
- Real-time search and filtering
- Statistics dashboard with visual cards
- Smooth animations and transitions
- Enhanced empty states with icons
- Confirmation dialogs for deletions
- Russian localization for all messages
- Improved visual feedback and hover effects
- Better focus states and accessibility
- Auto-scroll to newly added accounts
- Performance optimizations with computed properties

## Demonstration Features

### Functionality Testing

1. **Account Creation**: Click "Добавить" to create new account rows
2. **Form Validation**: 
   - Leave required fields empty to observe red error highlighting
   - Enter more than 50 characters in the labels field to trigger validation
   - Enter more than 100 characters in login or password fields to trigger validation
3. **Label Processing**: Enter "admin; user; developer" to observe semicolon separation behavior
4. **Record Type Selection**: 
   - Select "Локальная" to display the password field
   - Select "LDAP" to hide the password field and display "Значение"
5. **Password Management**:
   - Enter a password to observe masked display (dots)
   - Click the eye icon to toggle password visibility
6. **Data Persistence**: Refresh the page to verify all accounts are restored from localStorage
7. **Account Deletion**: Click the trash icon to remove accounts from the list (with confirmation)

### Enhanced Features Testing

8. **🔍 Search Functionality**: 
   - Use the search bar to filter accounts by login name or labels
   - Search is case-insensitive and works in real-time
9. **📊 Statistics Dashboard**: 
   - View account statistics in colorful cards above the list
   - Statistics update automatically as you add/remove accounts
10. **✨ Animations**: 
    - Observe smooth transitions when adding/removing accounts
    - Notice hover effects on buttons and form fields
11. **🎯 Enhanced UX**: 
    - See improved empty states with icons and helpful messages
    - Experience confirmation dialogs for account deletion
    - Notice auto-scroll to newly added accounts

## Build Commands

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## License

This project is available for use under standard open source licensing terms.

## Contributing

Contributions are welcome. Please follow standard Git workflow practices and ensure all tests pass before submitting pull requests.

---

Developed using Vue.js 3 and modern web development technologies.