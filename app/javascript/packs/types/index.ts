export interface Application {
  name: string
}

export interface SettingsSection {
  [propName: string]: any
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
  description: string
}

export interface Schema {
  [propName: string]: SchemaSection
}
