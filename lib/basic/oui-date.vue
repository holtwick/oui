<script lang="ts" setup>
import { computed } from 'vue'
import { dayFromString, dayFromToday, dayToString } from 'zeed'
import OuiFormItem from './oui-form-item.vue'

import './oui-form.styl'

withDefaults(defineProps<{
  title?: string
  description?: string
  required?: boolean
  id?: string
}>(), {
})

const model = defineModel<number | undefined>({
  required: true,
  default: dayFromToday(),
})

const date = computed({
  get() {
    return model.value ? dayToString(model.value) : ''
  },
  set(value) {
    model.value = value ? dayFromString(value) as number : undefined
  },
})
</script>

<template>
  <OuiFormItem :id="id" :title="title" :description="description" :required="required">
    <!-- Conditionally pass the title slot -->
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>

    <!-- Conditionally pass the description slot -->
    <template v-if="$slots.description" #description>
      <slot name="description" />
    </template>

    <input
      :id="id"
      v-model="date"
      type="date"
      class="oui-input oui-input-datetime"
      v-bind="$attrs"
    >
  </OuiFormItem>
</template>
