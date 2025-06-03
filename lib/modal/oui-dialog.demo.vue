<!-- eslint-disable no-alert -->
<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiButton, OuiCard, OuiDemo, useDialog } from '@/lib'
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
  state.value = confirm('Hello World') as any
}

function classicPrompt() {
  state.value = prompt('Hello World') as any
}

// function dialogAlert() {
//   dialog.alert('Hello World')
// }

// function dialogConfirm() {
//   dialog.confirm('Hello World').then(v => state.value = v as any)
// }

// function dialogPrompt() {
//   dialog.prompt('Hello World').then(v => state.value = v as any)
// }

// function dialogOpen() {
//   open().then(v => state.value = v as any)
// }
</script>

<template>
  <div class="oui-text">
    <h2>Modern</h2>
    <p>Async re-implementations of the classic dialogs.</p>
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
    </p>

    <hr>

    <h2>Classic</h2>
    <p>Synchronous "old" browser dialogs.</p>
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
    <hr>
    <h2>Result</h2>
    <p>
      <OuiCard>
        <pre>{{ state.value !== undefined ? JSON.stringify(state.value, null, 2) : undefined }}</pre>
      </OuiCard>
    </p>
  </div>
  <OuiDemo :state="state" />
</template>
