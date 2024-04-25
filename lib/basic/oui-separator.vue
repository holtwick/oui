<script lang="ts" setup>
import { ref } from 'vue'
import type { OuiDraggableEvent } from './_types'
import OuiDraggable from './oui-draggable.vue'
import { px } from './lib'

import './oui-separator.styl'

const props = withDefaults(defineProps<{
  side: 'top' | 'left' | 'right' | 'bottom'
  minSize: number
  maxSize: number
  absolute?: boolean
}>(), {
  absolute: false,
})

const _active = ref(false)

const modelSize = defineModel<number>({ required: true })
const modelStyle = defineModel<any>('styleValue', { required: false })

function updateStyle() {
  modelStyle.value = {
    [props.side === 'top' || props.side === 'bottom'
      ? 'height'
      : 'width'
    ]: px(modelSize.value),
  }
}

updateStyle()

function setSize(value: number) {
  modelSize.value = Math.max(props.minSize, Math.min(props.maxSize, value))
  updateStyle()
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
      _absolute: absolute,
    }"
    @move-start="doHandleMoveStart"
    @move-end="doHandleMoveEnd"
    @move="doHandleMove"
  />
</template>
