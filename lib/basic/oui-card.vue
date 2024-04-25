<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'

const props = defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="oui-card">
    <div v-if="$slots.header || $slots.title || title" class="oui-card-header">
      <slot name="header">
        <slot name="title">
          {{ title }}
        </slot>
      </slot>
    </div>
    <slot />
    <div v-if="$slots.footer" class="oui-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
