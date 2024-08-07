export interface OuiMenuItem {
  id?: string | number
  title?: string
  value?: string
  checked?: boolean | ((id: OuiMenuItem) => boolean | undefined)
  disabled?: boolean
  close?: boolean
  url?: string
  action?: (item: OuiMenuItem, ...args: any[]) => void
}
