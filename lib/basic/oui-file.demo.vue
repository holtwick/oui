<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiCheckbox, OuiDemo, OuiFile, OuiInput } from '@/lib'

const state = reactive({
  value: '',
  multiple: false,
  accept: 'image/*',
  title: 'Choose file...',
})
</script>

<template>
  <div>
    <OuiFile
      v-model="state.value"
      :multiple="state.multiple"
      :title="state.title"
      :accept="state.accept"
    />
  </div>
  <OuiDemo :state="state">
    <OuiInput v-model="state.title" title="Title" />
    <OuiInput v-model="state.accept" title="Accept file types (MIME)" />
    <OuiCheckbox v-model="state.multiple" switch title="Multiple files" />
  </OuiDemo>
</template>
