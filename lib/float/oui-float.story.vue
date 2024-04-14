<script lang="ts" setup>
import { ref } from 'vue'
import { OuiFloat } from './index'

function initialState() {
  return {
    show: false,
  }
}

const button = ref()
</script>

<template>
  <Story auto-props-disabled>
    <template #controls="{ state }">
      <HstCheckbox v-model="state.show" title="show" />
    </template>
    <Variant title="Simple popover" :init-state="initialState">
      <template #default="{ state }">
        <button ref="button" @click="state.show = !state.show">
          Click me
        </button>
        <OuiFloat v-model="state.show" :reference="button">
          This is the popover
        </OuiFloat>
      </template>
    </Variant>
  </story>
</template>

<docs lang="md">
  # My documentation

  Checkout this [cool video](https://www.youtube.com/watch?v=dQw4w9WgXcQ)!
</docs>
