<script setup lang="ts">
import { ref } from 'vue'
import { OuiFloat, OuiMenu, OuiMenuItems, OuiTooltipActivator } from '../lib/main'

const show = ref(true)
const show2 = ref(false)
const anchor = ref()
const anchor2 = ref()

const check1 = ref(false)
const check2 = ref(true)

function doAction() {
  // eslint-disable-next-line no-alert
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
      <button ref="anchor" @click="show = !show">
        Click to toggle
      </button>
      <OuiFloat v-model="show" :reference="anchor" placement="right" :offset="10">
        <div class="my-float">
          This is floating
        </div>
      </OuiFloat>
    </p>

    <p>
      <button ref="anchor2" @click="show2 = !show2">
        OuiMenu {{ show2 }}
      </button>
      <OuiMenu
        v-model="show2"
        hover
        :reference="anchor2"
        :items="[
          {
            title: 'Hello',
            action: doAction,
          },
          {
            title: 'Hello Disabled',
            disabled: true,
            action: doAction,
          },
          {},
          {
            title: 'One',
            checked: check1,
            action: () => check1 = !check1,
            close: false,
          },
          {
            title: 'Two',
            checked: check2,
            action: () => check2 = !check2,
            close: false,
          },
        ]"
      />
    </p>

    <!-- <p>
      <OuiFloatButton placement="right" :offset="10" name="oui-menu">
        OuiFloatButton

        <template #float>
          <div class="my-float">
            This is floating
          </div>
        </template>
      </OuiFloatButton>
    </p> -->

    <p>
      TRIGGER

      <OuiFloat placement="right" :offset="10" close hover>
        <template #trigger="{ active }">
          <button>OuiFloat #click {{ active }}</button>
        </template>

        This is floating

        <form action="#">
          <input id="x" type="text" name="x">
          <select>
            <option value="1">
              Eins
            </option>
            <option value="2">
              Eins
            </option>
          </select>
        </form>
      </OuiFloat>
    </p>

    <p class="oui-menu">
      <OuiMenuItems
        class="demo-menu"
        :items="[
          {
            title: 'Hello',
            action: doAction,
          },
          {},
          {
            title: 'One',
            checked: false,
            close: false,
          },
          {
            title: 'Two',
            checked: true,
            close: false,
          },
        ]"
      />
    </p>

    <OuiTooltipActivator />
  </div>
</template>
