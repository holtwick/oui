<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { nextTick, onMounted } from 'vue'
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'
import { useSingleton } from '../basic/singleton'

import './oui-mobile.styl'
import { isInsideScrollable } from './drag-util'

const props = defineProps<{
  mode?: 'app' | 'body'
}>()

const log: LoggerInterface = Logger('oui-mobile')

/**
 * 400ms takes the virtual keyboard to show up,
 * other values seem to have an negative effect on the layout
 */
const keyboardAnimationDuration = 400

if (useSingleton('oui-mobile')) {
  log('init')
  if (window.visualViewport != null) {
    let timer: any
    let virtualKeyboardActive = false

    async function resizeHandler() {
    // Adjust the height!
      const height = `${window.visualViewport?.height.toString()}px`
      log(`resize height=${height}`)
      // document.documentElement.style.height = `${window.visualViewport?.height.toString()}px`
      document.documentElement.style.setProperty('--visible-height', height)

      await nextTick()

      // Try to guess, if the virtual keyboard did show up
      // https://stackoverflow.com/questions/497094/how-do-i-find-out-which-dom-element-has-the-focus
      virtualKeyboardActive = document.activeElement?.matches('input,textarea,[contenteditable]') ?? false
      if (virtualKeyboardActive) {
        document.documentElement.classList.add('virtual-keyboard')
        clearTimeout(timer)

        // With some delay scroll active/focussed element into view
        timer = setTimeout(() => {
          if (document.activeElement?.matches('input,textarea,[contenteditable]')) {
            log('scroll into view', document.activeElement)
            document.activeElement?.scrollIntoView({
            // behavior: 'smooth',
              behavior: 'instant',
              block: 'nearest',
              inline: 'nearest',
            })
          }
        }, keyboardAnimationDuration)
      }
      else {
        document.documentElement.classList.remove('virtual-keyboard')
      }
    }

    useEventListener(window.visualViewport, 'resize', resizeHandler)
    useEventListener(window.visualViewport, 'scroll', resizeHandler)

    // if (props.mode === 'app') {
    // Intercept `touchmove` where no scrolling is planned in our UI
    useEventListener(window, 'touchmove', (ev) => {
      log('touch move', ev.target)

      // if (virtualKeyboardActive === false)
      //   return

      if (isInsideScrollable(ev.target as any))
        return
      
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
    // }

    onMounted(resizeHandler)
  }

  onMounted(() => document.documentElement.classList.add('oui-mobile'))
}
</script>

<template>
  <Teleport to="body" />
</template>
