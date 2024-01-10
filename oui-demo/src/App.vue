<script setup lang="ts">
import { ref } from 'vue'
import { OuiModal } from 'oui-modal'
import { OuiObject } from 'oui-object'

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
const show = ref(true)
</script>

<template>
  <div class="prose">
    <h1>Oui</h1>
    <p>Just another set of UI components for Vue.js with a proper French-sounding name</p>
    <p>
      <Test />
    </p>
    <OuiModal v-model="show">
      <div>Hello World</div>
      <div>
        <OuiObject :obj="obj" />
      </div>
    </OuiModal>
  </div>
</template>
