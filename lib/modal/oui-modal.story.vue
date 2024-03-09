<script lang="ts" setup>
import { OuiModal } from '@/lib'

function initialState() {
  return {
    show: false,
  }
}
</script>

<template>
  <Story auto-props-disabled>
    <template #controls="{ state }">
      <HstCheckbox v-model="state.show" title="show" />
    </template>
    <Variant title="useMenu" :init-state="initialState">
      <template #default="{ state }">
        <h1>Oui</h1>
        <p>Just another set of UI components for Vue.js with a proper French-sounding name</p>
        <button @click="state.show = !state.show">
          Click to show modal
        </button>
        <OuiModal v-model="state.show" close>
          <template #header>
            Header
          </template>
          Body
          <template #footer>
            Footer
          </template>          
        </OuiModal>
      </template>
    </Variant>
  </story>
</template>

<docs lang="md">

</docs>
