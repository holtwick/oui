<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core'
import { computed, ref } from 'vue'
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'
import { px } from './lib'
import OuiSeparator from './oui-separator.vue'

import './oui-resizeable.styl'

const props = withDefaults(defineProps<{
  name: string
  side: 'top' | 'left' | 'right' | 'bottom'
  size: number
  minSize: number
  maxSize: number
}>(), {
})

const log: LoggerInterface = Logger('oui-resizeable')

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
</script>

<template>
  <div ref="root" :style="style" class="oui-resizeable">
    <OuiSeparator
      :side="side"
      :size="paneSize"
      :min-size="minSize"
      :max-size="maxSize"
      class="oui-resizeable-separator"
      @size="setSize"
    />
    name={{ name }} size={{ paneSize }}
    <slot />
  </div>
</template>
