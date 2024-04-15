<script lang="ts" setup>
import OuiDialogExample from './oui-dialog-example.vue'
import { useDialog } from '@/lib'

function initialState() {
  return {
    show: false,
  }
}

const { alert, confirm, prompt } = useDialog()
const { open } = useDialog(OuiDialogExample)
</script>

<template>
  <Story auto-props-disabled>
    <template #controls="{ state }">
      <HstCheckbox v-model="state.show" title="show" />
    </template>
    <Variant title="useDialog" :init-state="initialState">
      <template #default>
        <div class="button-group">
          <button @click="alert('Hello World')">
            Alert
          </button>
          <button @click="confirm('Hello World')">
            Confirm
          </button>
          <button @click="prompt('Hello World')">
            Prompt
          </button>
          <button @click="open">
            Custom
          </button>
          <button @click="open">
            Custom
          </button>
        </div>
      </template>
    </Variant>
  </story>
</template>

<docs lang="md">

</docs>
