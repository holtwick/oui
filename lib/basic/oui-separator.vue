<script lang="ts" setup>
import { ref } from 'vue'
import type { OuiDraggableEvent } from './_types'
import OuiDraggable from './oui-draggable.vue'

import './oui-separator.styl'

const props = withDefaults(defineProps<{
  side: 'top' | 'left' | 'right' | 'bottom'
  minSize: number
  maxSize: number
}>(), {
})

const _active = ref(false)

const modelSize = defineModel<number>({ required: true })

function setSize(value: number) {
  modelSize.value = Math.max(props.minSize, Math.min(props.maxSize, value))
}

let startSize = 0

function doHandleMoveStart(e: OuiDraggableEvent) {
  _active.value = true
  startSize = modelSize.value
}

function doHandleMove(e: OuiDraggableEvent) {
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
  doHandleMove(e)
  _active.value = false
}
</script>

<template>
  <OuiDraggable
    class="oui-separator"
    :class="{
      [`_${side}`]: true,
      _active,
    }"
    @move-start="doHandleMoveStart"
    @move-end="doHandleMoveEnd"
    @move="doHandleMove"
  />
</template>
