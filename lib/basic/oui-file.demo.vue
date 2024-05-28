<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core'
import { OuiCheckbox, OuiDemo, OuiFile, OuiInput } from '@/lib'

const state = useLocalStorage('oui.demo.file', {
  value: '',
  multiple: true,
  preview: true,
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
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-up"><path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" /><path d="m14 19.5 3-3 3 3" /><path d="M17 22v-5.5" /><circle cx="9" cy="9" r="2" /></svg>
    </OuiFile>
  </div>
  <OuiDemo :state="state">
    <OuiInput v-model="state.title" title="Title" />
    <OuiInput v-model="state.accept" title="Accept file types (MIME)" />
    <OuiCheckbox v-model="state.multiple" switch title="Multiple files" />
    <OuiCheckbox v-model="state.preview" switch title="Preview" />
  </OuiDemo>
</template>
