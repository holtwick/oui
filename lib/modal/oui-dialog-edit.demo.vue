<script lang="ts" setup>
import OuiDialogExample from './oui-dialog-edit.example.vue'
import { dialogOpen, useDialogOpen } from './use-dialog'
import { OuiButton } from '@/lib'

const open = useDialogOpen(OuiDialogExample)
</script>

<template>
  <OuiButton @click="dialogOpen(OuiDialogExample)">
    Create Dialog with dialogOpen
  </OuiButton>
  <OuiButton @click="dialogOpen(OuiDialogExample, { id: 123 })">
    Edit Dialog with dialogOpen
  </OuiButton>
  <br>
  <br>
  <OuiButton @click="open()">
    Create Dialog with useDialogOpen
  </OuiButton>
  <OuiButton @click="open({ id: 123 })">
    Edit Dialog with useDialogOpen
  </OuiButton>
</template>
