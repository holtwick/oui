<script lang="ts" setup>
import './oui-password.styl'

defineProps<{
  showMeter?: boolean
}>()

const model = defineModel({ required: true })
</script>

<template>
  <input
    v-model="model"
    type="password"
    class="oui-input"
  >
  <AppInputPasswordMeter
    :value="model"
    style="width: 20ch"
  />
</template>
