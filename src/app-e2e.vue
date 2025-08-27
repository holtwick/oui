<script setup lang="ts">
import type { LoggerInterface } from 'zeed'
import { useDark } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'
import { Logger } from 'zeed'
import { OuiMobileActivator, OuiTooltipActivator } from '@/lib'

import './app-e2e.styl'

const log: LoggerInterface = Logger('app-e2e')

const modes = import.meta.glob('../**/*.demo.vue', {
  import: 'default',
  eager: true,
})

log.info('Available modes:', Object.keys(modes))

const comp = ref()

// Get initial mode from hash or fallback to localStorage
function setCompFromHash() {
  const hash = location.hash.slice(1)
  if (hash) {
    for (const v of Object.keys(modes)) {
      if (v.includes(hash))
        comp.value = modes[v]
    }
  }
}

setCompFromHash()

onMounted(() => window.addEventListener('hashchange', setCompFromHash))
onUnmounted(() => window.removeEventListener('hashchange', setCompFromHash))

const isDark = useDark()
isDark.value = location.search.includes('dark=1')
</script>

<template>
  <template v-if="comp">
    <div class="oui-demo">
      <component :is="comp" />
    </div>
  </template>
  <OuiTooltipActivator />
  <OuiMobileActivator />
</template>
