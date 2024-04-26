<script lang="ts" setup>
import OuiFormItem from './oui-form-item.vue'

import './oui-form.styl'

withDefaults(defineProps<{
  title?: string
  required?: boolean
  type?: 'text' | 'url' | 'email' | 'tel' | 'search'
  id?: string
}>(), {
  type: 'text',
})

const model = defineModel({ required: true })
</script>

<template>
  <OuiFormItem :id="id" :title="title" :required="required">
    <input
      :id="id"
      v-model="model"
      :type="type"
      class="oui-input oui-input-string"
      v-bind="$attrs"
    >
  </OuiFormItem>
</template>
