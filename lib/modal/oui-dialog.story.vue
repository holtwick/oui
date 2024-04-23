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
      <template #default="{ state }">
        <div>
          <OuiButton @click="alert('Hello World')">
            Alert
          </OuiButton>
          <OuiButton @click="confirm('Hello World').then(v => state.value = v)">
            Confirm
          </OuiButton>
          <OuiButton @click="prompt('Hello World').then(v => state.value = v)">
            Prompt
          </OuiButton>
          <OuiButton @click="open().then(v => state.value = v)">
            Custom
          </OuiButton>
        </div>
        <pre>Result = {{ state.value }}</pre>
      </template>
    </Variant>
  </story>
</template>

<docs lang="md">

</docs>
