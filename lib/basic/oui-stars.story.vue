<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiStars } from '../lib'

const state = reactive({
  value: 0,
})
</script>

<template>
  <Story auto-props-disabled>
    <template #controls>
      <HstNumber v-model="state.value" title="Stars" />
    </template>
    <Variant title="Default">
      <template #default>
        <OuiStars
          v-model="state.value"
        /> Rate
      </template>
    </Variant>
  </Story>
</template>
