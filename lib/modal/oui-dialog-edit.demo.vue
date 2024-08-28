<script lang="ts" setup>
import { reactive } from 'vue'
import OuiDialogExample from './oui-dialog-edit.example.vue'
import { OuiButton, OuiDemo, useDialog } from '@/lib'

const state = reactive({
  show: false,
  value: null,
})

const { open } = useDialog(OuiDialogExample)
</script>

<template>
  <OuiButton @click="open().then(v => state.value = v as any)">
    Create Dialog
  </OuiButton>
  <OuiButton @click="open({ id: 123 }).then(v => state.value = v as any)">
    Edit Dialog
  </OuiButton>
  <OuiDemo :state="state" />
</template>
