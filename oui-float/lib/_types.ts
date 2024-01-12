export interface OuiMenuItem {
  id?: string | number
  title?: string
  value?: string
  checked?: boolean | ((id: OuiMenuItem) => boolean | undefined)
  blocked?: boolean
  action?: (item: OuiMenuItem, ...args: any[]) => void
}
