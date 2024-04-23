<script lang="ts" setup>
import AppInputPasswordMeter from './oui-password-meter.vue'

import './oui-password.styl'

defineProps<{
  showMeter?: boolean
  placeholder?: string
}>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <div class="oui-password">
    <input
      v-model="model"
      type="password"
      class="oui-input"
      :placeholder="placeholder"
    >
    <AppInputPasswordMeter :value="model" />
  </div>
</template>
