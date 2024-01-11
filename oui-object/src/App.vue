<script setup lang="ts">
import { OuiObject } from '../lib/main'

const obj = {
  a: 1,
  b: 'b',
  c: [1, true, false, 'string', 3.12, null, undefined],
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
  <div class="prose">
    <h1>Oui</h1>
    <p>Just another set of UI components for Vue.js with a proper French-sounding name</p>
    <OuiObject :obj="obj" />
  </div>
</template>
