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

  <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient" x1="0" x2="0" y1="1" y2="0">
        <stop offset="0%" stop-color="#f2f2f2" />
        <stop offset="100%" stop-color="#e6e6e6" />
      </linearGradient>
    </defs>

    <path d="M50,350 L100,200 L150,300 L200,150 L250,250 L300,100 L350,300 L400,200 L450,350" fill="none" stroke="#4CAF50" stroke-width="3" />

    <path d="M50,350 L100,200 L150,300 L200,150 L250,250 L300,100 L350,300 L400,200 L450,350 L600,350" fill="url(#gradient)" />
  </svg>
  <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
    <!-- Farbverlauf definieren -->
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:rgba(255, 0, 0, 0.5); stop-opacity:1" />
        <stop offset="100%" style="stop-color:rgba(0, 0, 255, 0.5); stop-opacity:1" />
      </linearGradient>
    </defs>

    <!-- Fläche unter der Kurve -->
    <path
      d="M0,250
           C50,200, 150,100, 200,50
           C250,0, 350,30, 400,20
           L400,250
           L0,250 Z"
      fill="url(#grad1)"
    />

    <!-- Linie zeichnen -->
    <path
      d="M0,250
           C50,200, 150,100, 200,50
           C250,0, 350,30, 400,20"
      fill="none" stroke="black" stroke-width="2"
    />

    <!-- Achsen (optional) -->
    <line x1="0" y1="250" x2="400" y2="250" stroke="black" />
    <line x1="0" y1="0" x2="0" y2="300" stroke="black" />
  </svg>

  <!-- <OuiDemo :state="state">
    <OuiInputNumber v-model="state.x" title="X" />
    <OuiInputNumber v-model="state.y" title="Y" />
  </OuiDemo> -->
</template>
