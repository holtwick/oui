<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiDemo, OuiFile } from '../lib'

const state = reactive({
  value: '',
})
</script>

<template>
  <div>
    <OuiFile
      v-model="state.value"
    />
  </div>
  <OuiDemo :state="state" />
</template>
