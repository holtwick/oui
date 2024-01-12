<script setup lang="ts">
import { ref } from 'vue'
import { OuiFloat, OuiMenu, OuiTooltipActivator } from '../lib/main'
import { vActionToggle } from '../lib/lib'

const show = ref(true)
const show2 = ref(true)
const anchor = ref()
const anchor2 = ref()

function doAction() {
  alert(123)
}
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
      <button ref="anchor" v-action-toggle="show">
        Click to toggle
      </button>
      <OuiFloat v-model="show" :reference="anchor" placement="right" :offset="10">
        <div class="my-float">
          This is floating
        </div>
      </OuiFloat>
    </p>

    <p>
      <button ref="anchor2" v-menu="show2" @click="show2 = !show2">
        Click to toggle {{ show2 }}
      </button>
      <OuiMenu
        v-model="show2"
        :reference="anchor2"
        :items="[
          {
            title: 'Hello',
            action: doAction,
          },
          {},
          {
            title: 'One',
            checked: false,
          },
          {
            title: 'Two',
            checked: true,
          },
        ]"
      />
    </p>

    <OuiTooltipActivator />
  </div>
</template>
