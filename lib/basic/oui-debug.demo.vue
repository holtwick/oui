<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiCheckbox, OuiDebug, OuiDemo, OuiText } from '@/lib'

const state = reactive({
  show: true,
})
</script>

<template>
  <OuiText>
    <h1>oui-debug</h1>
    <p>Move your mouse over the small red dot in the bottom right corner to open the debug panel. This is a quick way to debug some data.</p>
    <OuiDebug v-if="state.show">
      {{ state }}
    </OuiDebug>
  </OuiText>

  <OuiDemo :state="state">
    <OuiCheckbox v-model="state.show" switch title="show" />
  </OuiDemo>
</template>
