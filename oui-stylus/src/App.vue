<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { computed, ref } from 'vue'

const modes = import.meta.glob('./app-*.vue', {
  import: 'default',
  eager: true,
})

const mode = useLocalStorage('oui.mode', './app-text.vue')
const dark = useLocalStorage('oui.dark', true)

const comp = computed(() => modes[mode.value])
</script>

<template>
  <div class="app-demo">
    <select v-model="mode">
      <template v-for="value in Object.keys(modes)" :key="value">
        <option :value="value">
          {{ value }}
        </option>
      </template>
    </select>
    &nbsp;
    <input v-model="dark" type="checkbox"> Show Dark Mode Preview
  </div>

  <div v-if="comp" class="_stack_x" style="gap: 16px; width: 100%;">
    <div>
      <component :is="comp" />
    </div>
    <div v-if="dark" class="dark default">
      <component :is="comp" />
    </div>
  </div>
</template>
