import type { Component } from 'vue'

export interface OuiSlidingPillOption<K extends string = string> {
  name: K
  title?: string
  icon?: Component | string
  pillClass?: string
}

export interface OuiTab<K extends string = string> extends OuiSlidingPillOption<K> {
  content?: any
}

export interface OuiSegmentedOption<K extends string = string> extends OuiSlidingPillOption<K> {
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
  timeMS: number
  // page: OuiDraggablePosition
  // delta: OuiDraggablePosition
  // pos: OuiDraggablePosition
  // origin: OuiDraggablePosition
}
