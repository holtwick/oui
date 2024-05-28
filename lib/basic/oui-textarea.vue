<script lang="ts" setup>
import OuiFormItem from './oui-form-item.vue'

import './oui-form.styl'

defineOptions({
  inheritAttrs: false,
})

withDefaults(defineProps<{
  title?: string
  description?: string
  required?: boolean
  id?: string
}>(), {
})

const model = defineModel<string>({ required: true })
</script>

<template>
  <OuiFormItem
    :id="id"
    :title="title"
    :description="description"
    :required="required"
  >
    <textarea
      :id="id"
      v-model="model"
      class="oui-textarea"
      v-bind="$attrs"
      rows="6"
    />
  </OuiFormItem>
</template>
