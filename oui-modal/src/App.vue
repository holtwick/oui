<script setup lang="ts">
import { ref } from 'vue'
import { OuiModal } from '../lib/main'

const show = ref(true)
</script>

<template>
  <div class="prose">
    <h1>Oui</h1>
    <p>Just another set of UI components for Vue.js with a proper French-sounding name</p>
    <OuiModal v-model="show">
      Hello
    </OuiModal>
  </div>
</template>
