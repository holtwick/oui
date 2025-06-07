<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiCheckbox, OuiDemo, OuiResizeable } from '@/lib'

import './oui-resizeable.demo.styl'

const state = reactive({
  showSepHandle: false,
  static: false,
})

const minSize = 100
const maxSize = 300
const size = 200
</script>

<template>
  <h2>Resizeable</h2>

  <div
    class="app-resizeable"
    :style="state.showSepHandle && '--separator-handle: rgba(255,0,0,0.25)'"
  >
    <OuiResizeable :static="state.static" side="bottom" :min-size="minSize" :max-size="maxSize" :size="size" class="top" name="top">
      Top
    </OuiResizeable>
    <div class="middle _grow">
      <OuiResizeable :static="state.static" side="right" :min-size="minSize" :max-size="maxSize" :size="size" class="left" name="left">
        Left
      </OuiResizeable>
      <div class="center _grow">
        Center
      </div>
      <OuiResizeable :static="state.static" side="left" :min-size="minSize" :max-size="maxSize" :size="size" class="right" name="right">
        Right
      </OuiResizeable>
    </div>
    <OuiResizeable :static="state.static" side="top" :min-size="minSize" :max-size="maxSize" :size="size" class="bottom" name="bottom">
      Bottom
    </OuiResizeable>
  </div>

  <OuiDemo :state="state">
    <OuiCheckbox v-model="state.showSepHandle" switch title="Highlight separator handle area" />
    <OuiCheckbox v-model="state.static" switch title="Static regular DIV, not dynamic" />
  </OuiDemo>
</template>
