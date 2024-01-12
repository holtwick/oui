<script lang="ts" setup>
import './example.styl'

defineProps<{
  title: string
}>()
</script>

<template>
  <div class="example">
    <h2>{{ title }}</h2>
    <slot />
  </div>
</template>
