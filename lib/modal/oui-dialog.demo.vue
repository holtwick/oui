<!-- eslint-disable no-alert -->
<script lang="ts" setup>
import { OuiButton, OuiDemo, useDialog } from '@/lib'
import { reactive } from 'vue'
import OuiDialogExample from './oui-dialog.example.vue'

const state = reactive({
  show: false,
  value: null,
})

const dialog = useDialog()
const { open } = useDialog(OuiDialogExample)

function classicAlert() {
  alert('Hello World')
}

function classicConfirm() {
  confirm('Hello World')
}

function classicPrompt() {
  prompt('Hello World')
}
</script>

<template>
  <h2>Modern</h2>
  <p>
    <OuiButton @click="dialog.alert('Hello World')">
      Alert
    </OuiButton>
    <OuiButton @click="dialog.confirm('Hello World').then(v => state.value = v as any)">
      Confirm
    </OuiButton>
    <OuiButton @click="dialog.prompt('Hello World').then(v => state.value = v as any)">
      Prompt
    </OuiButton>
    <OuiButton @click="open().then(v => state.value = v as any)">
      Custom
    </OuiButton>

    <br>
    <br>
    <br>

    <pre>result = {{ state.value }}</pre>
  </p>
  <h2>Classic</h2>
  <p>
    <OuiButton @click="classicAlert()">
      Alert
    </OuiButton>
    <OuiButton @click="classicConfirm()">
      Confirm
    </OuiButton>
    <OuiButton @click="classicPrompt()">
      Prompt
    </OuiButton>
  </p>
  <OuiDemo :state="state" />
</template>
