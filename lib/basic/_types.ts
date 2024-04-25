export interface OuiTab<K = string> {
  name: K
  title?: string
  icon?: string
}

export interface OuiTableColumn<K = string> {
  name: K
  title?: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  valign?: 'top' | 'middle' | 'bottom'
  footer?: string
  width?: number
  minWidth?: number
  maxWidth?: number
}

export interface OuiDraggableEvent {
  x: number
  y: number
  pageX: number
  pageY: number
  deltaX: number
  deltaY: number
}
