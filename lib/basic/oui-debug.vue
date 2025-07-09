<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Logger } from 'zeed'

import './oui-debug.styl'

const log: LoggerInterface = Logger('oui-debug')
const debugRef = ref<HTMLElement | null>(null)

function onKeydown(e: KeyboardEvent) {
  if (e.ctrlKey && e.key.toLowerCase() === 'd') {
    debugRef.value?.classList.toggle('_active')
    log.info('Debug panel activated')
  }
  if (e.key === 'Escape') {
    debugRef.value?.classList.remove('_active')
    log.info('Debug panel closed')
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <teleport to="body">
    <div ref="debugRef" class="oui-debug" tabindex="0">
      <div class="oui-debug-content">
        <slot />
      </div>
    </div>
  </teleport>
</template>
