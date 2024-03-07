import type { DirectiveBinding } from 'vue'
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'

const log: LoggerInterface = Logger('oui:v-menu')

const menuElements = new Map<HTMLElement, any>()

export const vMenu = {
  updated: (element: HTMLElement, binding: DirectiveBinding) => {
    // log('v-menu:updated', element, binding)
    log.assert(typeof binding.value === 'function', 'v-menu requires function as argument')
    menuElements.set(element, binding.value)
  },
  mounted: (element: HTMLElement, binding: DirectiveBinding) => {
    // log('v-menu:mounted', element, binding)
    log.assert(typeof binding.value === 'function', 'v-menu requires function as argument')

    menuElements.set(element, binding.value)
    element.addEventListener('contextmenu', (event: MouseEvent) => {
      // log('v-menu context')
      event.preventDefault() // no system menu
      const fn = menuElements.get(element)
      fn?.(event, element)
    })
    element.addEventListener('click', (event: MouseEvent) => {
      // log('v-menu click')
      const fn = menuElements.get(element)
      fn?.(event, element)
    })
  },
  beforeUnmount: (element: HTMLElement, binding: DirectiveBinding) => {
    // log('v-menu:beforeUnmount', element, binding)
    menuElements.delete(element)
  },
}
