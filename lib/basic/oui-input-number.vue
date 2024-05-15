<script lang="ts" setup>
import OuiFormItem from './oui-form-item.vue'

import './oui-form.styl'

defineOptions({
  inheritAttrs: false,
})

withDefaults(defineProps<{
  title?: string
  required?: boolean
  id?: string
}>(), {})

const model = defineModel<number>({ required: true })
</script>

<template>
  <OuiFormItem :id="id" :title="title" :required="required">
    <input
      :id="id"
      v-model="model"
      type="number"
      class="oui-number"
      v-bind="$attrs"
    >
  </OuiFormItem>
</template>
