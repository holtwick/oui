<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  switch?: boolean
  intermediate?: boolean
}>(), {
  switch: false,
  intermediate: false,
})

const model = defineModel({ required: true })

// Fixes Vue issue not supporting non-boolean values
// https://github.com/vuejs/core/issues/5775
const modelBool = computed({
  get() {
    return !!model.value
  },
  set(value: any) {
    model.value = value
  },
})

const klass = computed(() => {
  const klasses = [props.switch ? 'oui-switch' : 'oui-checkbox']
  if (model.value == null)
    klasses.push('_checkbox_intermediate')
  return klasses
})
</script>

<template>
  <template v-if="title || $slots.default">
    <label>
      <input v-model="modelBool" type="checkbox" :class="klass">
      {{ ' ' }}
      <slot>{{ title }}</slot>
    </label>
  </template>
  <template v-else>
    <input v-model="modelBool" type="checkbox" :class="klass">
  </template>
</template>
