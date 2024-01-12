<script lang="ts" setup>
import { ref } from 'vue'
import { OuiModal } from 'oui-modal'

import 'oui-modal/css'

const show = ref(false)
</script>

<template>
  <button @click="show = !show">
    Click to show modal
  </button>
  <OuiModal v-model="show">
    This is the modal
  </OuiModal>
</template>
