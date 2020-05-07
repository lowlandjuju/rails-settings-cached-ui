export interface Application {
  name: string
}

/* Settings */
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

/* Schema */
export interface Schema {
  [propName: string]: SchemaSection
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
