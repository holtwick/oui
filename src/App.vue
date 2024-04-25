<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { last, sortedOrderby } from 'zeed'
import { OuiButton, OuiCheckbox, OuiResizeable } from '@/lib'

const modes = import.meta.glob('../**/(app-*|*.demo).vue', {
  import: 'default',
  eager: true,
})

const mode = useLocalStorage('oui.demo.mode', './app-text.vue')
const dark = useLocalStorage('oui.demo.dark', true)

const showProperties = useLocalStorage('oui.demo.properties', true)
const showUI = ref(true)

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

function toggleDark() {
  document.documentElement.classList.toggle('dark')
}
</script>

<template>
  <div class="oui-demo">
    <div class="oui-demo-header">
      <select v-model="mode" class="oui-select">
        <template v-for="({ value, title }) in allModes" :key="value">
          <option :value="value">
            {{ title }}
          </option>
        </template>
      </select>

      <div class="_space" />

      <div class="_middle">
        <OuiCheckbox v-model="dark" switch>
          Show light and dark side by side
        </OuiCheckbox>
      </div>

      <div class="_space" />

      <OuiButton @click="toggleDark">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-moon"><path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.9 4.9 1.4 1.4" /><path d="m17.7 17.7 1.4 1.4" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.3 17.7-1.4 1.4" /><path d="m19.1 4.9-1.4 1.4" /></svg>
      </OuiButton>

      <OuiButton @click="showProperties = !showProperties">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-right"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M15 3v18" /></svg>
      </OuiButton>
    </div>
    <div class="oui-demo-body">
      <div class="oui-demo-sandbox" :class="{ _sidebyside: dark }">
        <template v-if="active && comp">
          <div>
            <component :is="comp" />
          </div>
          <div v-if="dark" class="dark default">
            <component :is="comp" />
          </div>
        </template>
      </div>
      <OuiResizeable
        :hide="!showProperties"
        name="demo.props"
        :size="400"
        side="left"
        :max-size="800"
        :min-size="200"
        color="var(--t3-fg)"
        class="oui-demo-sidebar"
      >
        <div class="oui-demo-props">
          <h1>Properties</h1>
          <div id="props" />
        </div>
        <OuiResizeable
          :hide="!showProperties"
          name="demo.state"
          :size="400"
          side="top"
          :max-size="800"
          :min-size="60"
          color="var(--t3-fg)"
          class="oui-demo-state"
        >
          <h1>State</h1>
          <div id="state" />
        </OuiResizeable>
      </OuiResizeable>
    </div>
  </div>
</template>
