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
      Just another set of UI components for <i :tooltip="'A longer tooltip\nin multiple lines\nYeah!'">Vue.js</i> with a proper French-sounding name
    </p>
    <button tooltip="Hello, I am a tooltip">
      Tooltip
    </button>
    <br>
    <p>
      <OuiFloat v-model="show" :reference="anchor" placement="right" class="oui-float oui-tooltip _tooltip">
        <template #click>
          <button>tooltip</button>
        </template>
        This is floating
      </OuiFloat>
    </p>
    <p>
      <button ref="anchor" @click="show = !show">
        Click to toggle
      </button>
      <OuiFloat v-model="show" :reference="anchor" placement="right">
        <div class="my-float">
          This is floating
        </div>
      </OuiFloat>
    </p>

    <OuiTooltipActivator />
  </div>
</template>
