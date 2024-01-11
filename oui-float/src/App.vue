<script setup lang="ts">
import { ref } from 'vue'
import { OuiFloat, OuiTooltipActivator } from '../lib/main'

const show = ref(true)
const anchor = ref()
</script>

<template>
  <div class="prose">
    <h1>Oui</h1>
    <p>
      Just another set of UI components for <i
        tooltip="A longer tooltip
in multiple lines
Yeah!"
      >Vue.js</i> with a proper French-sounding name
    </p>
    <button tooltip="Hello, I am a tooltip">
      Tooltip
    </button>
    <br>
    <p>
      <button ref="anchor" @click="show = !show">
        Click to toggle
      </button>
      <OuiFloat v-model="show" :reference="anchor" placement="right" :offset="10">
        <div class="my-float">
          This is floating
        </div>
      </OuiFloat>
    </p>

    <OuiTooltipActivator />
  </div>
</template>
