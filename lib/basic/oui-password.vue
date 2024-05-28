<script lang="ts" setup>
import OuiFormItem from './oui-form-item.vue'
import OuiInputPasswordMeter from './oui-password-meter.vue'

import './oui-password.styl'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  showMeter?: boolean
  placeholder?: string
  title?: string
  description?: string
  required?: boolean
  id?: string
}>()

const model = defineModel<string | undefined>({ required: true })
</script>

<template>
  <OuiFormItem
    :id="id"
    :title="title"
    :description="description"
    :required="required"
  >
    <div class="oui-password">
      <input
        v-model="model"
        type="password"
        class="oui-input"
        :placeholder="placeholder"
        v-bind="$attrs"
      >
      <template v-if="showMeter !== false">
        <OuiInputPasswordMeter :value="model" />
      </template>
    </div>
  </OuiFormItem>
</template>
