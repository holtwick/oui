<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  switch?: boolean
}>(), {
  switch: false,
})

const klass = computed(() => props.switch ? 'oui-switch' : 'oui-checkbox')

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
