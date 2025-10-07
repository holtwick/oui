<script lang="ts" setup>
import { computed } from 'vue'
import { getTimestamp } from 'zeed'
import OuiFormItem from './oui-form-item.vue'

import './oui-form.styl'

withDefaults(defineProps<{
  title?: string
  description?: string
  required?: boolean
  id?: string
}>(), {
})

const model = defineModel<number>({
  required: true,
  default: getTimestamp(),
})

const date = computed({
  get() {
    const mdate = new Date(model.value)
    const date = new Date()
    date.setUTCFullYear(mdate.getFullYear())
    date.setUTCMonth(mdate.getMonth())
    date.setUTCDate(mdate.getDate())
    date.setUTCHours(mdate.getHours())
    date.setUTCMinutes(mdate.getMinutes())
    date.setUTCSeconds(mdate.getSeconds())
    date.setUTCMilliseconds(mdate.getMilliseconds())
    return date.toISOString().slice(0, 16)
  },
  set(value) {
    const [y, m, d, hh, mm] = value.replace(/\D/g, ' ').split(' ')
    const date = new Date()
    date.setFullYear(+y)
    date.setMonth(+m - 1)
    date.setDate(+d)
    date.setHours(+hh)
    date.setMinutes(+mm)
    date.setSeconds(0)
    date.setMilliseconds(0)
    model.value = date.getTime()
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
      type="datetime-local"
      class="oui-input oui-input-datetime"
      v-bind="$attrs"
    >
  </OuiFormItem>
</template>
