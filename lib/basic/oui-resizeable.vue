<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core'
import { computed, ref } from 'vue'
import { px } from './lib'
import OuiDraggable from './oui-draggable.vue'

import './oui-resizeable.styl'
import type { OuiDraggableEvent } from './_types'

const props = withDefaults(defineProps<{
  name: string
  side: 'top' | 'left' | 'right' | 'bottom'
  size: number
  minSize: number
  maxSize: number
}>(), {
})

const paneSize = useLocalStorage(`oui.resizeable.${props.name}`, props.size)

function setSize(value: number) {
  paneSize.value = Math.max(props.minSize, Math.min(props.maxSize, value))
}

setSize(paneSize.value)

const root = ref()

const style = computed(() => {
  if (props.side === 'top' || props.side === 'bottom')
    return { height: px(paneSize.value) }
  else
    return { width: px(paneSize.value) }
})

function doHandleMove(e: OuiDraggableEvent) {
  setSize(paneSize.value + e.pageX)
}
</script>

<template>
  <div ref="root" :style="style" class="oui-resizeable">
    <OuiDraggable class="oui-resizeable-separator" :class="`_${side}`" @move="doHandleMove" />
    {{ paneSize }}
    <slot />
  </div>
</template>
