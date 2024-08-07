<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { ref } from 'vue'
import type { LoggerInterface } from 'zeed'
import { Logger, getTimestamp } from 'zeed'
import { isInsideScrollable } from '../mobile/drag-util'
import type { OuiDraggableEvent } from './_types'

const props = defineProps<{
  onlyTouch?: boolean
  cancelEvents?: boolean
}>()

const emit = defineEmits<{
  moveStart: [OuiDraggableEvent]
  move: [OuiDraggableEvent]
  moveEnd: [OuiDraggableEvent]
}>()

const log: LoggerInterface = Logger('oui-draggable')

const el = ref()

let timeStart = 0
let dragging = false
let collapsed = false
let startX = 0
let startY = 0
let lastX = 0
let lastY = 0
let deltaX = 0
let deltaY = 0
let lastEvent: OuiDraggableEvent | undefined

function translateTouchEvent(e: TouchEvent): OuiDraggableEvent {
  const { pageX, pageY } = e?.touches?.[0] ?? e
  deltaX = pageX - lastX
  deltaY = pageY - lastY
  lastX = pageX
  lastY = pageY
  const moveX = startX - pageX
  const moveY = startY - pageY
  const info: OuiDraggableEvent = {
    startX,
    startY,
    pageX,
    pageY,
    deltaX,
    deltaY,
    moveX,
    moveY,
    timeMS: getTimestamp() - timeStart,
  }
  log('event', info)
  lastEvent = info
  return info
}

function cancelEvent(e: TouchEvent) {
  if (props.cancelEvents) {
    e?.stopPropagation()
    e?.preventDefault()
  }
}

function onMouseDown(e: TouchEvent) {
  if (e.target && el.value && isInsideScrollable(e.target as any, el.value))
    return

  log('down')
  const { pageX, pageY } = e?.touches?.[0] ?? e
  timeStart = getTimestamp()
  dragging = true
  startX = pageX
  startY = pageY
  lastX = pageX
  lastY = pageY
  emit('moveStart', translateTouchEvent(e))
  bindEvents()
  return cancelEvent(e)
}

function onMouseMove(e: TouchEvent) {
  log('move', dragging, e)
  if (!dragging)
    return
  emit('move', translateTouchEvent(e))
  return cancelEvent(e)
}

function onMouseUp(e: TouchEvent) {
  log('up')
  dragging = false
  if (lastEvent)
    lastEvent.timeMS = getTimestamp() - timeStart
  emit('moveEnd', lastEvent ?? translateTouchEvent(e))
  lastEvent = undefined
  unbindEvents()
  return cancelEvent(e)
}

function onDblClick() {
  collapsed = !collapsed
}

const mouseOptions = { passive: false }

if (!props.onlyTouch) {
  useEventListener(el, 'mousedown', onMouseDown)
  useEventListener(el, 'dblclick', onDblClick)
}

useEventListener(el, 'touchstart', onMouseDown)

let docListeners: any[] = []

// https://github.com/antoniandre/splitpanes/blob/master/src/components/splitpanes/splitpanes.vue
function bindEvents() {
  docListeners = [
    useEventListener(document, 'touchmove', onMouseMove, mouseOptions),
    useEventListener(document, 'touchend', onMouseUp),
  ]

  if (!props.onlyTouch) {
    docListeners.push(
      useEventListener(document, 'mousemove', onMouseMove, mouseOptions),
      useEventListener(document, 'mouseup', onMouseUp),
    )
  }
}

function unbindEvents() {
  docListeners.forEach(stop => stop())
  docListeners = []
}
</script>

<template>
  <div ref="el" data-noscroll="true">
    <slot />
  </div>
</template>
