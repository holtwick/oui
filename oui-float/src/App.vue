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
      Just another set of UI components for Vue.js with a proper French-sounding name
    </p>
    <button tooltip="Hello, I am a tooltip">
      Hover me for tooltip
    </button>
    <br>
    <p>
      <OuiFloat :reference="anchor" placement="right">
        <template #click>
          <button>tooltip</button>
        </template>
        <div class="my-float">
          This is floating
        </div>
      </OuiFloat>
    </p>
    <p>
      <button ref="anchor" @click="show = !show">
        Click to toggle
      </button>
      <OuiFloat v-model="show" :reference="anchor" class="oui-float" placement="right">
        <div class="my-float">
          This is floating
        </div>
      </OuiFloat>
    </p>

    <OuiTooltipActivator />
  </div>
</template>
