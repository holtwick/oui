<script lang="ts" setup>
import OuiFormItem from './oui-form-item.vue'
import OuiInputPasswordMeter from './oui-password-meter.vue'

import './oui-password.styl'

defineProps<{
  showMeter?: boolean
  placeholder?: string
  title?: string
  required?: boolean
  id?: string
}>()

const model = defineModel<string | undefined>({ required: true })
</script>

<template>
  <OuiFormItem :id="id" :title="title" :required="required">
    <div class="oui-password">
      <input
        v-model="model"
        type="password"
        class="oui-input"
        :placeholder="placeholder"
      >
      <OuiInputPasswordMeter :value="model" />
    </div>
  </OuiFormItem>
</template>
