import type { DirectiveBinding } from 'vue'
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'

const log: LoggerInterface = Logger('oui:v-menu')

function g() {
  return globalThis as any
}

function getMenuElements() {
  let menuElements = g().__ouiVMenuCache
  if (menuElements == null) {
    menuElements = new Map<HTMLElement, any>()
    g().__ouiVMenuCache = menuElements
  }
  return menuElements
}

export const vMenu = {
  updated: (element: HTMLElement, binding: DirectiveBinding) => {
    // log('v-menu:updated', element, binding)
    log.assert(typeof binding.value === 'function', 'v-menu requires function as argument')
    getMenuElements().set(element, binding.value)
  },
  mounted: (element: HTMLElement, binding: DirectiveBinding) => {
    // log('v-menu:mounted', element, binding)
    log.assert(typeof binding.value === 'function', 'v-menu requires function as argument')

    getMenuElements().set(element, binding.value)
    element.addEventListener('contextmenu', (event: MouseEvent) => {
      // log('v-menu context')
      event.preventDefault() // no system menu
      const fn = getMenuElements().get(element)
      fn?.(event, element)
    })
    element.addEventListener('click', (event: MouseEvent) => {
      // log('v-menu click')
      const fn = getMenuElements().get(element)
      fn?.(event, element)
    })
  },
  beforeUnmount: (element: HTMLElement, binding: DirectiveBinding) => {
    // log('v-menu:beforeUnmount', element, binding)
    getMenuElements().delete(element)
  },
}
