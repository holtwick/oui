<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'
import { reactive } from 'vue'
import OuiInput from './oui-input.vue'

const log: LoggerInterface = Logger('oui-form-item.demo')

const state = reactive({
  value1: '',
  value2: '',
})
</script>

<template>
  <div>
    <OuiInput v-model="state.value1" />
    <OuiInput v-model="state.value2" title="Value with label" required />
  </div>
</template>
