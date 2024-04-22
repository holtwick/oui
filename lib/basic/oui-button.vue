<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'

withDefaults(defineProps<{
  title?: string
  mode?: 'primary' | 'danger' | 'secondary'
}>(), {
})

const log: LoggerInterface = Logger('oui-button')
</script>

<template>
  <button class="oui-button" :class="mode ? `_${mode}` : undefined">
    <slot>{{ title }}</slot>
  </button>
</template>
