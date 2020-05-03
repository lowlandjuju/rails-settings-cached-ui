export interface Application {
  name: string
}

export interface Setting {
  [propName: string]: any
  SchemaItem?
}

export interface SettingsSection {
  [propName: string]: Setting
}

export interface Settings {
  [propName: string]: SettingsSection
}

export interface SchemaSection {
  [propName: string]: SchemaItem
}

export interface SchemaItem {
  type: string
  label: string
  description: string | null
  link: string | null
  available: boolean
}

export interface Schema {
  [propName: string]: SchemaSection
}
