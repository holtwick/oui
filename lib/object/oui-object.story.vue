<script lang="ts" setup>
import { OuiObject } from '@/lib'

function initialState() {
  return {
    show: false,
    json: {
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
    },
  }
}
</script>

<template>
  <Story auto-props-disabled>
    <template #controls="{ state }">
      <!-- https://github.com/histoire-dev/histoire/tree/692e6f580e56cddeb24d0afe27d8154ca62fef62/packages/histoire-controls/src/components -->
      <HstCheckbox v-model="state.show" title="show" />
      <HstJson v-model="state.json" title="json" />
    </template>
    <Variant title="useMenu" :init-state="initialState">
      <template #default="{ state }">
        <h1>Oui</h1>
        <p>Just another set of UI components for Vue.js with a proper French-sounding name</p>
        <OuiObject :value="state.json" title="sample" />
      </template>
    </Variant>
  </story>
</template>

<docs lang="md">

</docs>
