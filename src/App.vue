<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { last, sortedOrderby } from 'zeed'
import { OuiCheckbox } from '@/lib'

const modes = import.meta.glob('../**/(app-*|*.demo).vue', {
  import: 'default',
  eager: true,
})

const mode = useLocalStorage('oui.mode', './app-text.vue')
const dark = useLocalStorage('oui.dark', true)

const allModes = computed(() => {
  return sortedOrderby(Object.keys(modes).map(value => ({
    value,
    title: last(value.split('/'))?.replace(/\.(demo\.vue|vue)/gim, ''),
  })), 'title')
})

const comp = computed(() => {
  return modes[mode.value]
})
</script>

<template>
  <div class="app-demo">
    <select v-model="mode" class="oui-select">
      <template v-for="({ value, title }) in allModes" :key="value">
        <option :value="value">
          {{ title }}
        </option>
      </template>
    </select>
    &nbsp;
    <OuiCheckbox v-model="dark" switch>
      Show Dark Mode Preview
    </OuiCheckbox>
  </div>

  <div v-if="comp" class="_stack_x" style="gap: 16px; width: 100%;">
    <div class="_grow default">
      <component :is="comp" />
    </div>
    <div v-if="dark" class="_grow dark default">
      <component :is="comp" />
    </div>
  </div>
</template>
