<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { onMounted } from 'vue'

import './oui-mobile.styl'

let timer: any
if (window.visualViewport != null) {
  function resizeHandler() {
    // Adjust the height!
    document.documentElement.style.height = `${window.visualViewport?.height.toString()}px`

    // Try to guess, if the virtual keyboard did show up
    if (document.activeElement?.matches('input,textarea,[contenteditable]'))
      document.documentElement.classList.add('virtual-keyboard')
    else
      document.documentElement.classList.remove('virtual-keyboard')

    // With some delayscroll active/focussed element into view
    clearTimeout(timer)
    timer = setTimeout(() => {
      document.activeElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    },
    // 400ms takes the virtual keyboard to show up;
    // other values seem to have an negative effect on the layout
    400,
    )
  }

  useEventListener(window.visualViewport, 'resize', resizeHandler)
  useEventListener(window.visualViewport, 'scroll', resizeHandler)

  // Intercept `touchmove` where no scrolling is planned in our UI
  useEventListener(window, 'touchmove', (ev) => {
    // Figure out, if we are inside an element with custom scrolling
    let el = ev.target as HTMLElement | undefined | null
    while (el != null) {
      if (el.dataset.scroll)
        return
      el = el.parentElement
    }

    // If not avoid scrolling
    ev.preventDefault()
    ev.stopPropagation()
  }, {
    // make sure, we get those events
    passive: false,
    // capture them as early as possible
    capture: true,
  })

  onMounted(resizeHandler)
}

onMounted(() => document.documentElement.classList.add('oui-mobile'))
</script>

<template>
  { '' }
</template>
