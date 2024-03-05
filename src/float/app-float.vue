<!-- eslint-disable no-alert -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { LoggerInterface } from 'zeed'
import { Logger, uuid } from 'zeed'
import { OuiFloat, OuiMenu, type OuiMenuItem, OuiMenuItems, OuiTooltipActivator, useMenu, vMenu } from '@/lib'

import './index.styl'

const log: LoggerInterface = Logger('app-menu')

const show = ref(true)
const show2 = ref(false)
const show3 = ref(false)
const anchor = ref()
const anchor2 = ref()

const check1 = ref(false)
const check2 = ref(true)

const items = computed<OuiMenuItem[]>(() => [
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
    checked: check1.value,
    action: () => check1.value = !check1.value,
    close: false,
  },
  {
    title: 'Two',
    checked: check2.value,
    action: () => check2.value = !check2.value,
    close: false,
  },
])

function doAction() {
  // eslint-disable-next-line no-alert
  alert(123)
}

const mitems: OuiMenuItem[] = [{
  title: 'Hello',
  action: value => alert(value),
}]

// const menu = useMenu(mitems)
const menu = useMenu(() => ([{
  title: `Hello ${uuid()}`,
  action: (_menuItem, value) => {
    alert(value)
  },
}]))

function menuWithArgs(value: any) {
  return (...args: any) => menu(value, ...args)
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
        :items="items"
      />
    &nbsp;
      <OuiMenu
        v-model="show3"
        :items="items"
      >
        <button>Menu2 {{ show3 }}</button>
      </OuiMenu>
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
        :items="items"
      />
    </p>

    <hr>

    <button v-menu="menu">
      Dynamic Menu
    </button>

    <button v-menu="menuWithArgs(1)">
      Dynamic Menu 1
    </button>

    <button v-menu="menuWithArgs(2)">
      Dynamic Menu 2
    </button>

    <div v-menu="menu" style="border: 1px solid black; width: 200px; height: 200px;">
      Click somewhere
    </div>
    <OuiTooltipActivator />
  </div>
</template>
