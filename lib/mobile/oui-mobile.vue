<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { onMounted } from 'vue'
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'

import './oui-mobile.styl'

const log: LoggerInterface = Logger('oui-mobile')

if (window.visualViewport != null) {
  let timer: any
  let virtualKeyboardActive = false

  function resizeHandler() {
    // Adjust the height!
    document.documentElement.style.height = `${window.visualViewport?.height.toString()}px`

    // Try to guess, if the virtual keyboard did show up
    // https://stackoverflow.com/questions/497094/how-do-i-find-out-which-dom-element-has-the-focus
    virtualKeyboardActive = document.activeElement?.matches('input,textarea,[contenteditable]') ?? false
    if (virtualKeyboardActive)
      document.documentElement.classList.add('virtual-keyboard')
    else
      document.documentElement.classList.remove('virtual-keyboard')

    // With some delayscroll active/focussed element into view
    clearTimeout(timer)
    timer = setTimeout(() => {
      // todo not always "smart"
      document.activeElement?.scrollIntoView({
        // behavior: 'smooth',
        behavior: 'instant',
        block: 'nearest',
        inline: 'nearest',
      })

      window.scrollTo(0, 0)
    },
    // 400ms takes the virtual keyboard to show up;
    // other values seem to have an negative effect on the layout
    400)
  }

  useEventListener(window.visualViewport, 'resize', resizeHandler)
  useEventListener(window.visualViewport, 'scroll', resizeHandler)

  // Intercept `touchmove` where no scrolling is planned in our UI
  useEventListener(window, 'touchmove', (ev) => {
    // if (virtualKeyboardActive === false)
    //   return

    // Figure out, if we are inside an element with custom scrolling
    let el = ev.target as HTMLElement | undefined | null
    while (el != null) {
      const { overflow } = window.getComputedStyle(el)
      if (overflow.split(' ').some(o => o === 'auto' || o === 'scroll'))
        return
      el = el.parentElement
    }

    log('prevent scroll')
    // If not avoid scrolling
    ev.preventDefault()
    // ev.stopPropagation()
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
  <Teleport to="body" />
</template>
