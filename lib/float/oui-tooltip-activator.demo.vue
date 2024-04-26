<script lang="ts" setup>
import { OuiTooltipActivator } from './index'
</script>

<template>
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

  <p>Also boxes work:</p>
  <div tooltip="Box" style="background-color: yellow;">
    Demo
  </div>

  <OuiTooltipActivator />
</template>

<style>
  [tooltip] {
  text-decoration: underline;
  text-decoration-style: dotted;
  }
</style>
