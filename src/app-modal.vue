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
        Header Header Header Header Header Header Header
      </template>
      <div style="background: red; height: 10vh;" />
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores eum incidunt officia facilis id, magni fugiat temporibus labore, facere, sequi nostrum cum asperiores eligendi eos. Libero voluptas facilis quos ipsam!
      <br>
      <br>
      <input type="text" class="oui-input">
      <template #footer>
        Footer Footer Footer Footer Footer Footer Footer
      </template>
    </OuiModal>
  </div>
</template>
