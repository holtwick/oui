<script lang="ts" setup>
import { uuid } from 'zeed'
import OuiFormItem from './oui-form-item.vue'

import './oui-form.styl'

withDefaults(defineProps<{
  title?: string
  required?: boolean
  id?: string
}>(), {
  id: uuid(),
})

const model = defineModel({ required: true })
</script>

<template>
  <OuiFormItem :id="id" :title="title" :required="required">
    <input
      :id="id"
      v-model="model"
      type="string"
      class="oui-input"
      v-bind="$attrs"
    >
  </OuiFormItem>
</template>
