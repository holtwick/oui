<script lang="ts" setup>
import type { OuiDraggableEvent } from '@/lib'
import { reactive, ref } from 'vue'
import { OuiDemo, OuiDraggable, OuiInputNumber } from '@/lib'

const state = reactive({
  x: 100,
  y: 100,
})

const data = ref({})

function move(e: OuiDraggableEvent) {
  data.value = e
  state.x += e.deltaX
  state.y += e.deltaY
}
</script>

<template>
  <h2>Draggable</h2>

  <OuiDraggable
    class="app-draggable-box"
    :style="{
      left: `${state.x}px`,
      top: `${state.y}px`,
    }"
    @move="move"
  >
    {{ data }}
  </OuiDraggable>

  <OuiDemo :state="state">
    <OuiInputNumber v-model="state.x" title="X" />
    <OuiInputNumber v-model="state.y" title="Y" />
  </OuiDemo>
</template>

<style>
.app-draggable-box {
  background: purple;
  color: white;
  position: absolute;
  width: 200px;
  height:200px;
}
</style>
