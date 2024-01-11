<script setup lang="ts">
import ExampleOuiFloat from './example-oui-float.vue'
import ExampleOuiFloatTooltip from './example-oui-float-tooltip.vue'
import ExampleOuiModal from './example-oui-modal.vue'
import ExampleOuiObject from './example-oui-object.vue'
import Example from './example.vue'
</script>

<template>
  <div class="prose">
    <h1>Oui</h1>
    <p>Just another set of UI components for Vue.js with a proper French-sounding name</p>

    <Example title="oui-float">
      <ExampleOuiFloat />
    </Example>

    <Example title="oui-float tooltip">
      <ExampleOuiFloatTooltip />
    </Example>

    <Example title="oui-modal">
      <ExampleOuiModal />
    </Example>

    <Example title="oui-object">
      <ExampleOuiObject />
    </Example>
  </div>
</template>
