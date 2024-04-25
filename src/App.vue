<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { last, sortedOrderby } from 'zeed'
import { OuiCheckbox } from '@/lib'

const modes = import.meta.glob('../**/(app-*|*.demo).vue', {
  import: 'default',
  eager: true,
})

const mode = useLocalStorage('oui.demo.mode', './app-text.vue')
const dark = useLocalStorage('oui.demo.dark', true)
const showProperties = useLocalStorage('oui.demo.properties', true)

const allModes = computed(() => {
  return sortedOrderby(Object.keys(modes).map(value => ({
    value,
    title: last(value.split('/'))?.replace(/\.(demo\.vue|vue)/gim, ''),
  })), 'title')
})

const comp = computed(() => {
  return modes[mode.value]
})

const active = ref(false)

onMounted(() => {
  active.value = true
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
    &nbsp;
    <OuiCheckbox v-model="showProperties" switch>
      Show Properties
    </OuiCheckbox>
  </div>

  <template v-if="active">
    <div v-if="comp" class="_stack_x" style="gap: 16px; width: 100%;">
      <div class="_grow default">
        <component :is="comp" />
      </div>
      <div v-if="dark" class="_grow dark default">
        <component :is="comp" />
      </div>
    </div>
  </template>

  <div v-show="showProperties" class="oui-demo-properties">
    <h1>Properties</h1>
    <div id="props" />
  </div>
</template>
