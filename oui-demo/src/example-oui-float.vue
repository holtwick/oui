<script lang="ts" setup>
import { ref } from 'vue'
import { OuiFloat } from 'oui-float'

import 'oui-float/css'

const button = ref()
const show = ref(false)
</script>

<template>
  <button ref="button" @click="show = !show">
    Click me
  </button>
  <OuiFloat v-modal="show" :reference="button" class="oui-float">
    This is the popover
  </OuiFloat>
</template>
