<script lang="ts" setup>
import { useDialog } from '@/lib'

function initialState() {
  return {
    show: false,
  }
}

const { alert, confirm, prompt } = useDialog()
</script>

<template>
  <Story auto-props-disabled>
    <template #controls="{ state }">
      <HstCheckbox v-model="state.show" title="show" />
    </template>
    <Variant title="useDialog" :init-state="initialState">
      <template #default="{ state }">
        <button @click="alert('Hello World')">
          Alert
        </button>
        <button @click="confirm('Hello World')">
          Confirm
        </button>
        <button @click="prompt('Hello World')">
          Prompt
        </button>
      </template>
    </Variant>
  </story>
</template>

<docs lang="md">

</docs>
