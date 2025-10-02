<script setup lang="ts">
import type { LoggerInterface } from 'zeed'
import { useDark } from '@vueuse/core'
import { nextTick, ref } from 'vue'
import { Logger } from 'zeed'
import { OuiMobileActivator, OuiTooltipActivator } from '@/lib'

import 'v-calendar/style.css'
import './app-e2e.styl'

const log: LoggerInterface = Logger('app-e2e')

const modes = import.meta.glob('../**/*.demo.vue', {
  import: 'default',
  eager: true,
})

log.info('Available modes:', Object.keys(modes))

const comp = ref()

const isDark = useDark()
isDark.value = location.search.includes('dark=1')

// // Get initial mode from hash or fallback to localStorage
// function setCompFromHash() {
//   const hash = location.hash.slice(1)
//   if (hash) {
//     for (const v of Object.keys(modes)) {
//       if (v.includes(hash)) {
//         comp.value = modes[v]
//         return
//       }
//     }
//   }
// }

// setCompFromHash()

const globalAny = globalThis as any

globalAny.setPage = async (name: string, dark = false) => {
  log.info('Set page to', name, 'dark:', dark)
  comp.value = undefined
  for (const v of Object.keys(modes)) {
    if (v.includes(name)) {
      comp.value = modes[v]
      if (dark)
        isDark.value = true
      else
        isDark.value = false
      return
    }
  }
  log.warn('Page not found:', name)
  await nextTick()
}

// onMounted(() => window.addEventListener('hashchange', setCompFromHash))
// onUnmounted(() => window.removeEventListener('hashchange', setCompFromHash))
</script>

<template>
  <template v-if="comp">
    <div class="oui-demo">
      <component :is="comp" />
    </div>
  </template>
  <div class="oui-demo-loaded">
    Loaded!
  </div>
  <OuiTooltipActivator />
  <OuiMobileActivator />
</template>
