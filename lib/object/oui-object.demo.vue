<script setup lang="ts">
import { OuiObject, OuiText } from '@/lib'

const obj = {
  a: 1,
  b: 'b',
  c: [1, true, false, 'string fiff <- no ligatures!', 3.12, null, undefined],
  cc: [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3],
  d: {
    x: {
      y: 999,
    },
  },
  e: [],
  f: {},
}
</script>

<template>
  <OuiText>
    <h1>Oui</h1>
    <p>Just another set of UI components for Vue.js with a proper French-sounding name</p>
    <OuiObject :value="obj" title="sample" />
  </OuiText>
</template>
