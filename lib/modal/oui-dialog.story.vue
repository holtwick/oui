<script lang="ts" setup>
import OuiDialogExample from './oui-dialog-example.vue'
import { OuiButton, useDialog } from '@/lib'

function initialState() {
  return {
    show: false,
    value: null,
  }
}

const { alert, confirm, prompt } = useDialog()
const { open } = useDialog(OuiDialogExample)
</script>

<template>
  <Story auto-props-disabled>
    <template #controls="{ state }">
      <HstJson v-model="state.value" title="Result" />
      <HstCheckbox v-model="state.show" title="show" />
    </template>
    <Variant title="useDialog" :init-state="initialState">
      <template #default>
        <div>
          <OuiButton @click="alert('Hello World')">
            Alert
          </OuiButton>
          <OuiButton @click="confirm('Hello World')">
            Confirm
          </OuiButton>
          <OuiButton @click="prompt('Hello World')">
            Prompt
          </OuiButton>
          <OuiButton @click="open">
            Custom
          </OuiButton>
          <OuiButton @click="open">
            Custom
          </OuiButton>
        </div>
      </template>
    </Variant>
  </story>
</template>

<docs lang="md">

</docs>
