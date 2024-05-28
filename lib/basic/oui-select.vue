<script lang="ts" setup>
import { computed } from 'vue'
import { isPrimitive } from 'zeed'
import OuiFormItem from './oui-form-item.vue'

import './oui-form.styl'

const props = withDefaults(defineProps<{
  options?: [string | number, string | number][] | (string | number)[]
  title?: string
  description?: string
  required?: boolean
  id?: string
}>(), {

})

const model = defineModel({ required: true })

const allOptions = computed(() => (props.options ?? []).map(v => isPrimitive(v) ? [v, v] : v))
</script>

<template>
  <OuiFormItem
    :id="id"
    :title="title"
    :description="description"
    :required="required"
  >
    <select v-model="model" v-bind="$attrs" class="oui-select">
      <slot>
        <template v-for="[key, value] in allOptions" :key="key">
          <option :value="key">
            {{ value }}
          </option>
        </template>
      </slot>
    </select>
  </OuiFormItem>
</template>
