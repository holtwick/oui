<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'
import OuiSeparator from './oui-separator.vue'

import './oui-resizeable.styl'

const props = withDefaults(defineProps<{
  name: string
  side: 'top' | 'left' | 'right' | 'bottom'
  size: number
  minSize: number
  maxSize: number
  color?: string
  hide?: boolean

  /// This will make the component a simple div without the resizeable separator
  static?: boolean
}>(), {
})

const paneSize = useLocalStorage(`oui.resizeable.${props.name}`, props.size)

const style = ref()
</script>

<template>
  <template v-if="static">
    <div v-bind="$attrs">
      <slot />
    </div>
  </template>
  <template v-else>
    <template v-if="side === 'right' || side === 'bottom'">
      <div v-show="hide !== true" :style="style" v-bind="$attrs" class="oui-resizeable">
        <slot />
      </div>
    </template>
    <OuiSeparator
      v-show="hide !== true"
      v-model="paneSize"
      v-model:style-value="style"
      :side="side"
      :min-size="minSize"
      :max-size="maxSize"
      :color="color"
    />
    <template v-if="side === 'left' || side === 'top'">
      <div v-show="hide !== true" :style="style" v-bind="$attrs" class="oui-resizeable">
        <slot />
      </div>
    </template>
  </template>
</template>
