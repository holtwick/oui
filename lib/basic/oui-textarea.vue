<script lang="ts" setup>
import { useFileDialog, useTextareaAutosize, watchThrottled } from '@vueuse/core'
import OuiFormItem from './oui-form-item.vue'

import './oui-form.styl'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  required?: boolean
  id?: string
  autosize?: boolean
}>(), {
  autosize: false,
})

const model = defineModel<string>({ required: true })

const { textarea } = props.autosize === true ? useTextareaAutosize({ input: model }) : {}
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
      v-bind="$attrs"
      ref="textarea"
      v-model="model"
      class="oui-textarea"
      :class="{ _autosize: props.autosize }"
      rows="6"
    />
  </OuiFormItem>
</template>
