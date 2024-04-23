<script setup lang="ts">
import { ref } from 'vue'
import OuiButton from '../lib/basic/oui-button.vue'
import OuiText from '../lib/basic/oui-text.vue'
import OuiInput from '../lib/basic/oui-input.vue'
import { OuiModal, vAutofocus } from '@/lib'

const show = ref(false)
const value = ref('Hello')
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
      <OuiText>
        <OuiInput v-model="value" />
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores eum incidunt officia facilis id, magni fugiat temporibus labore, facere, sequi nostrum cum asperiores eligendi eos. Libero voluptas facilis quos ipsam!</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores eum incidunt officia facilis id, magni fugiat temporibus labore, facere, sequi nostrum cum asperiores eligendi eos. Libero voluptas facilis quos ipsam!</p>
      </OuiText>
      <template #footer>
        <OuiButton mode="secondary">
          Cancel
        </OuiButton>
        <OuiButton v-autofocus mode="primary">
          OK
        </OuiButton>
      </template>
    </OuiModal>
  </div>
</template>
