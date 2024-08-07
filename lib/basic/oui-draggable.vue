<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { ref } from 'vue'
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'
import type { OuiDraggableEvent } from './_types'

const emit = defineEmits<{
  moveStart: [OuiDraggableEvent]
  move: [OuiDraggableEvent]
  moveEnd: [OuiDraggableEvent]
}>()

const log: LoggerInterface = Logger('oui-draggable')

const el = ref()

let dragging = false
let collapsed = false
let startX = 0
let startY = 0
let lastX = 0
let lastY = 0
let deltaX = 0
let deltaY = 0

function translateTouchEvent(e: TouchEvent): OuiDraggableEvent {
  const { pageX, pageY } = e?.touches?.[0] ?? e
  deltaX = pageX - lastX
  deltaY = pageY - lastY
  lastX = pageX
  lastY = pageY
  const moveX = startX - pageX
  const moveY = startY - pageY
  const info = {
    startX,
    startY,
    pageX,
    pageY,
    deltaX,
    deltaY,
    moveX,
    moveY,
  }
  log('event', info)
  return info
}

function cancelEvent(e: TouchEvent) {
  // log('sep cancel')
  e?.stopPropagation()
  e?.preventDefault()
}

function onMouseDown(e: TouchEvent) {
  log('down')
  const { pageX, pageY } = e?.touches?.[0] ?? e
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
  emit('moveEnd', translateTouchEvent(e))
  unbindEvents()
  return cancelEvent(e)
}

function onDblClick() {
  collapsed = !collapsed
}

const mouseOptions = { passive: false }

useEventListener(el, 'mousedown', onMouseDown)
useEventListener(el, 'touchstart', onMouseDown)
useEventListener(el, 'dblclick', onDblClick)

let docListeners: any[] = []

// https://github.com/antoniandre/splitpanes/blob/master/src/components/splitpanes/splitpanes.vue
function bindEvents() {
  docListeners = [
    useEventListener(document, 'mousemove', onMouseMove, mouseOptions),
    useEventListener(document, 'mouseup', onMouseUp),
    useEventListener(document, 'touchmove', onMouseMove, mouseOptions),
    useEventListener(document, 'touchend', onMouseUp),
  ]
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
