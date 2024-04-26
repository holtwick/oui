<script lang="ts" setup>
import { reactive } from 'vue'
import OuiDialogExample from './oui-dialog.example.vue'
import { OuiButton, OuiDemo, useDialog } from '@/lib'

const state = reactive({
  show: false,
  value: null,
})

const { alert, confirm, prompt } = useDialog()
const { open } = useDialog(OuiDialogExample)
</script>

<template>
  <div>
    <OuiButton @click="alert('Hello World')">
      Alert
    </OuiButton>
    <OuiButton @click="confirm('Hello World').then(v => state.value = v as any)">
      Confirm
    </OuiButton>
    <OuiButton @click="prompt('Hello World').then(v => state.value = v as any)">
      Prompt
    </OuiButton>
    <OuiButton @click="open().then(v => state.value = v as any)">
      Custom
    </OuiButton>

    <br>
    <br>
    <br>

    <pre>result = {{ state.value }}</pre>
  </div>
  <OuiDemo :state="state" />
</template>
