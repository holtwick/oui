<script lang="ts" setup>
import { computed } from 'vue'

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
  <input v-model="modelBool" type="checkbox" class="oui-switch">
</template>
