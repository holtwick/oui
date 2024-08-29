<script lang="ts" setup>
import { computed, reactive } from 'vue'
import OuiChart from './oui-chart.vue'

const state = reactive({

})

const data = computed(() => {
  const values = [50, 200, 300, 150, 250, 100, 300, 200, 350]
  return values.map((v, i) => ({ x: i, y: v }))
})
</script>

<template>
  <h2>Chart</h2>

  <OuiChart
    :width="600"
    :height="400"
    :points="data"
  />

  <!-- <OuiDemo :state="state">
    <OuiInputNumber v-model="state.x" title="X" />
    <OuiInputNumber v-model="state.y" title="Y" />
  </OuiDemo> -->
</template>
