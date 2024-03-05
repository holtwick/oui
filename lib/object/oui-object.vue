<script lang="ts" setup>
import ObjectVisualizer from './lib/ObjectVisualizer.vue'

defineProps<{
  value: any
  title?: string
}>()
</script>

<template>
  <ObjectVisualizer
    :data="value"
    :root-name="title ?? 'value'"
    :expand-on-created-and-updated="(path) => path.length < 2"
  />
</template>
