<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'
import OuiSeparator from './oui-separator.vue'

// import './oui-resizeable.styl'

const props = withDefaults(defineProps<{
  name: string
  side: 'top' | 'left' | 'right' | 'bottom'
  size: number
  minSize: number
  maxSize: number
}>(), {
})

const paneSize = useLocalStorage(`oui.resizeable.${props.name}`, props.size)

const style = ref()
</script>

<template>
  <template v-if="side === 'right' || side === 'bottom'">
    <div :style="style" class="oui-resizeable" v-bind="$attrs">
      <slot />
    </div>
  </template>
  <OuiSeparator
    v-model="paneSize"
    v-model:style-value="style"
    :side="side"
    :min-size="minSize"
    :max-size="maxSize"
    style="position: relative;"
    class="oui-resizeable-separator"
  />
  <template v-if="side === 'left' || side === 'top'">
    <div :style="style" class="oui-resizeable" v-bind="$attrs">
      <slot />
    </div>
  </template>
</template>
