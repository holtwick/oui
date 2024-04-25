<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { ref } from 'vue'
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'
import type { OuiDraggableEvent } from './_types'

const emit = defineEmits<{
  move: [OuiDraggableEvent]
}>()

const log: LoggerInterface = Logger('oui-draggable')

const el = ref()

let dragging = false
let collapsed = false
let startX = 0
let startY = 0
let deltaX = 0
let deltaY = 0

function cancelEvent(e: MouseEvent) {
  // log('sep cancel')
  e?.stopPropagation()
  e?.preventDefault()
}

function onMouseDown(e: MouseEvent) {
  const { pageX, pageY } = e
  dragging = true
  startX = pageX
  startY = pageY
  bindEvents()
  return cancelEvent(e)
}

function onMouseMove(e: MouseEvent) {
  if (!dragging)
    return
  const { pageX, pageY } = e
  deltaX = pageX - startX
  deltaY = pageY - startY

  startX = pageX
  startY = pageY

  log('xy', deltaX, deltaY, pageX, startX)
  emit('move', {
    pageX,
    pageY,
    x: deltaX,
    y: deltaY,
    deltaX,
    deltaY,
  })
  return cancelEvent(e)
}

function onMouseUp(e: MouseEvent) {
  dragging = false
  unbindEvents()
  return cancelEvent(e)
}

function onDblClick() {
  collapsed = !collapsed
}

const mouseOptions = { passive: false }

useEventListener(el, 'mousedown', onMouseDown)
useEventListener(el, 'touchdown', onMouseDown)
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
  <div ref="el">
    <slot />
  </div>
</template>
