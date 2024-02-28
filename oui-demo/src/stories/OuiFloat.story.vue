<script lang="ts" setup>
import { logEvent } from 'histoire/client'
import { ref } from 'vue'
import { OuiFloat } from 'oui-float'

import 'oui-float/css'

function initialState() {
  return {
    show: false,
  }
}

const button = ref()
const show = ref(false)
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
