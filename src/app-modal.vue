<script setup lang="ts">
import { ref } from 'vue'
import { OuiButton, OuiInput, OuiModal, OuiText, vAutofocus } from '@/lib'

const show = ref(false)
const value = ref('Hello')
</script>

<template>
  <div>
    <OuiButton @click="show = !show">
      Click to show modal
    </OuiButton>
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
