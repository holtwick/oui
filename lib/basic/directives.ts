import { ref } from 'vue'
import type { DirectiveBinding } from 'vue'

/** Vue3 Directive! */
export const vActionToggle = {
  mounted: (el: HTMLElement, binding: DirectiveBinding, ...args: any) => {
    // console.log(el, binding, args)
    if (binding instanceof ref)
      throw new Error('v-action-toggle requires ref as argument')
    el.addEventListener('contextmenu', (ev: MouseEvent) => {
      // console.log('menu')
      ev.preventDefault() // no system menu
      binding.value = !binding.value
    })

    el.addEventListener('click', (ev: MouseEvent) => {
      // console.log('click', binding)
      binding.value = !binding.value
    })
  },
}

/** Vue3 Directive! */
export const vActionTrue = {
  mounted: (el: HTMLElement, binding: DirectiveBinding) => {
    if (binding instanceof ref)
      throw new Error('v-action-ture requires ref  as argument')
    el.addEventListener('contextmenu', (ev: MouseEvent) => {
      ev.preventDefault() // no system menu
      binding.value = true
    })

    el.addEventListener('click', (ev: MouseEvent) => {
      binding.value = true
    })
  },
}

/** Vue3 Directive! Fixes an issue in WKWebView where the cursor pretends text selection even if user-select: none; */
export const vNoSelection = {
  mounted: (el: HTMLElement, _binding: DirectiveBinding) => {
    log.warn('v-no-selection, use with care! causes issues on draggable!')
    if (!el.draggable) {
      el.addEventListener('pointermove', (ev: MouseEvent) =>
        ev.preventDefault(),
      )
    }
  },
}

/** Vue3 Directive! Fixes an issue in WKWebView where the cursor pretends text selection even if user-select: none; */
export const vAutofocus = {
  mounted: (el: HTMLElement, _binding: DirectiveBinding) => {
    log('focus', el)
    setTimeout(() => el.focus(), 50)
  },
}
