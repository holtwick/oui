<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'
import type { OuiDraggableEvent } from './_types'
import OuiDraggable from './oui-draggable.vue'

const props = withDefaults(defineProps<{
  side: 'top' | 'left' | 'right' | 'bottom'
  size: number
  minSize: number
  maxSize: number
}>(), {
})

const emit = defineEmits<{
  size: [size: number]
}>()

const log: LoggerInterface = Logger('oui-separator')

function setSize(value: number) {
  const size = Math.max(props.minSize, Math.min(props.maxSize, value))
  log('size', size)
  emit('size', size)
}

let startSize = 0

function doHandleMoveStart(e: OuiDraggableEvent) {
  startSize = props.size
}

function doHandleMove(e: OuiDraggableEvent) {
  log('move', e.pageX, e.deltaY)
  if (props.side === 'top')
    setSize(startSize + e.moveY)
  else if (props.side === 'bottom')
    setSize(startSize - e.moveY)
  else if (props.side === 'left')
    setSize(startSize + e.moveX)
  else
    setSize(startSize - e.moveX)
}

function doHandleMoveEnd(e: OuiDraggableEvent) {
  doHandleMoveEnd(e)
}
</script>

<template>
  <OuiDraggable
    :class="`_${side}`"
    @move-start="doHandleMoveStart"
    @move-end="doHandleMoveEnd"
    @move="doHandleMove"
  />
</template>
