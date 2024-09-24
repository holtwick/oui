<script lang="ts" setup>
import { OuiButton, OuiCheckbox, OuiClose, OuiDemo } from '@/lib'
import { reactive } from 'vue'
import image from '../../public/apple-touch-icon-180x180.png?url'

const state = reactive({
  disabled: false,
  dropdown: false,
})
</script>

<template>
  <div>
    <OuiButton :disabled="state.disabled" title="Title" />
    <br>
    <br>
    <OuiButton :disabled="state.disabled">
      Slot
    </OuiButton>
    <br>
    <br>
    <OuiButton :disabled="state.disabled" mode="danger">
      Danger
    </OuiButton>
    <OuiButton :disabled="state.disabled" mode="neutral">
      Neutral
    </OuiButton>
    <OuiButton :disabled="state.disabled" mode="primary">
      Primary
    </OuiButton>
    <br>
    <br>
    <OuiButton :disabled="state.disabled">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hammer"><path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" /><path d="m18 15 4-4" /><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" /></svg>
      Neutral
    </OuiButton>
    <br>
    <br>
    <OuiButton :disabled="state.disabled" mode="ghost">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hammer"><path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" /><path d="m18 15 4-4" /><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" /></svg>
    </OuiButton>
    <br>
    <br>
    <OuiButton size="small" :dropdown="state.dropdown">
      Small
    </OuiButton>

    <OuiButton size="normal" :dropdown="state.dropdown">
      Normal
    </OuiButton>

    <OuiButton size="large" :dropdown="state.dropdown">
      Large
    </OuiButton>
    <br>
    <br>
    <OuiButton size="small">
      <OuiClose />
    </OuiButton>

    <OuiButton size="normal">
      <OuiClose />
    </OuiButton>

    <OuiButton size="large">
      <OuiClose />
    </OuiButton>

    <br>
    <br>

    <OuiButton href="https://oui.holtwick.de" target="_blank">
      <img :src="image" alt="Logo">
      oui.holtwick.de
    </OuiButton>
  </div>

  <OuiDemo :state="state">
    <OuiCheckbox v-model="state.disabled" switch title="Disabled" />
    <OuiCheckbox v-model="state.dropdown" switch title="Drop down" />
  </OuiDemo>
</template>
