<script setup lang="ts">
import { ref } from 'vue'
import { OuiModal } from '@/lib'

const show = ref(false)
</script>

<template>
  <div>
    <h1>Oui</h1>
    <p>Just another set of UI components for Vue.js with a proper French-sounding name</p>
    <button @click="show = !show">
      Click to show modal
    </button>
    <OuiModal v-model="show" close>
      <template #header>
        Header
      </template>
      Body
      <template #footer>
        Footer
      </template>
    </OuiModal>
  </div>
</template>
