import type { DirectiveBinding } from 'vue'
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'

const log: LoggerInterface = Logger('oui:v-menu')

export const vMenu = {
  updated: (element: any, binding: DirectiveBinding) => {
    log.assert(typeof binding.value === 'function', 'v-menu requires function as argument')
    element.__ouiVMenu = binding.value
  },
  mounted: (element: any, binding: DirectiveBinding) => {
    log.assert(typeof binding.value === 'function', 'v-menu requires function as argument')
    element.__ouiVMenu = binding.value
    element.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault() // no system menu
      element.__ouiVMenu?.(event, element)
    })
    element.addEventListener('click', (event: MouseEvent) => {
      element.__ouiVMenu?.(event, element)
    })
  },
}
