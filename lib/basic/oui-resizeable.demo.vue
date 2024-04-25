<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiCard, OuiCheckbox, OuiObject, OuiResizeable } from '@/lib'

import './oui-resizeable.demo.styl'

const state = reactive({
  sort: '',
  footer: true,
  header: true,
  selectable: true,
  selected: undefined,
  fillLast: true,
  scrollToEnd: false,
  showSepHandle: false,
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
    <OuiResizeable side="bottom" :min-size="minSize" :max-size="maxSize" :size="size" class="top" name="top">
      Top
    </OuiResizeable>
    <div class="middle _grow">
      <OuiResizeable side="right" :min-size="minSize" :max-size="maxSize" :size="size" class="left" name="left">
        Left
      </OuiResizeable>
      <div class="center _grow">
        Center
      </div>
      <OuiResizeable side="left" :min-size="minSize" :max-size="maxSize" :size="size" class="right" name="right">
        Right
      </OuiResizeable>
    </div>
    <OuiResizeable side="top" :min-size="minSize" :max-size="maxSize" :size="size" class="bottom" name="bottom">
      Bottom
    </OuiResizeable>
  </div>

  <Teleport to="#props">
    <OuiCard title="Options">
      <OuiCheckbox v-model="state.showSepHandle" switch>
        showSepHandle
      </OuiCheckbox>
      <OuiObject :value="state" />
    </OuiCard>
  </Teleport>
</template>
