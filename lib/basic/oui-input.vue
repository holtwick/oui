<script lang="ts" setup>
import './oui-form.styl'

// const props = withDefaults(defineProps<{
// }>(), {
// })

const model = defineModel({ required: true })
</script>

<template>
  <input v-model="model" type="string" class="oui-input">
</template>
