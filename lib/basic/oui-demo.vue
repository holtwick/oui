<script lang="ts" setup>
import { OuiObject } from '@/lib'

defineProps<{
  state?: any
}>()
</script>

<template>
  <Teleport to="#props">
    <slot />
  </Teleport>
  <template v-if="state">
    <Teleport to="#state">
      <OuiObject :value="state" />
    </Teleport>
  </template>
</template>
