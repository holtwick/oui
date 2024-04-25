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

// interface OuiDraggablePosition {
//   x: number
//   y: number
// }

export interface OuiDraggableEvent {
  // x: number
  // y: number

  startX: number
  startY: number
  pageX: number
  pageY: number
  deltaX: number
  deltaY: number
  moveX: number
  moveY: number
  // page: OuiDraggablePosition
  // delta: OuiDraggablePosition
  // pos: OuiDraggablePosition
  // origin: OuiDraggablePosition
}
