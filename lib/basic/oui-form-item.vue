<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'

defineProps<{
  title?: string
  required?: boolean
  id?: string
}>()

const log: LoggerInterface = Logger('oui-form-item')
</script>

<template>
  <template v-if="title">
    <div class="oui-form-item">
      <label>
        <div class="oui-form-item-title">
          {{ title }}
          <span v-if="required">*</span>
        </div>
        <div class="oui-form-item-body">
          <slot />
        </div>
      </label>
    </div>
  </template>
  <template v-else>
    <slot />
  </template>
</template>
