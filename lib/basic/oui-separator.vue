<script lang="ts" setup>
import type { OuiDraggableEvent } from './_types'
import { useLocalStorage } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { px } from './lib'
import OuiDraggable from './oui-draggable.vue'

import './oui-separator.styl'

const props = withDefaults(defineProps<{
  side: 'top' | 'left' | 'right' | 'bottom'
  minSize: number
  maxSize: number
  absolute?: boolean
  color?: string
  name?: string
}>(), {
  absolute: false,
})

const model = defineModel<number>({ required: true })

const modelSize = props.name ? useLocalStorage(`oui.separator.${props.name}`, model.value) : ref(model.value)
// const modelSize = defineModel<number>({ required: true })

const _active = ref(false)

const modelStyle = defineModel<any>('styleValue', { required: false })

function updateStyle() {
  modelStyle.value = {
    [props.side === 'top' || props.side === 'bottom'
      ? 'height'
      : 'width'
    ]: px(modelSize.value),
  }
}

function setSize(value: number) {
  modelSize.value = Math.max(props.minSize, Math.min(props.maxSize, value))
  model.value = modelSize.value
  updateStyle()
}

onMounted(() => {
  if (props.name)
    setSize(modelSize.value)
  else if (modelSize.value && (modelSize.value < props.minSize || modelSize.value > props.maxSize))
    setSize(modelSize.value)
  else
    updateStyle()
})

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

const style = computed(() => props.color ? `--separator: ${props.color}` : undefined)
</script>

<template>
  <OuiDraggable
    class="oui-separator"
    :class="{
      [`_${side}`]: true,
      _active,
      _absolute: absolute,
    }"
    :style="style"
    @move-start="doHandleMoveStart"
    @move-end="doHandleMoveEnd"
    @move="doHandleMove"
  />
</template>
