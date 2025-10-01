export type RecordType = 'LDAP' | 'Local'

export interface Label {
  text: string
}

export interface Account {
  id: string
  label: Label[]
  recordType: RecordType
  login: string
  password: string | null
}

export interface AccountFormData {
  id: string
  label: string
  recordType: RecordType
  login: string
  password: string
}

export interface ValidationError {
  field: string
  message: string
}

export interface AccountState {
  accounts: Account[]
  validationErrors: Record<string, ValidationError[]>
}