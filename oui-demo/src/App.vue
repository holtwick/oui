<script setup lang="ts">
import { ref } from 'vue'
import ExampleOuiFloat from './example-oui-float.vue'
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

    <Example title="oui-object">
      <ExampleOuiObject />
    </Example>
  </div>
</template>
