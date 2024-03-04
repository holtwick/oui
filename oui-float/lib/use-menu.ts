import { OuiMenu } from 'oui-float'
import type { DirectiveBinding } from 'vue'
import type { OuiMenuItem } from './_types'
import { mountComponentAsApp } from './app-helper'

import 'oui-float/css'

type OuiMenus = (OuiMenuItem[] | undefined | null | false)[]
type OuiMenuCreator = (...args: any) => OuiMenus

/**
 * Context menu emulation.
 *
 * If triggered by BUTTON it will show as a drop down, else close to the mouse position.
 */
export function useMenu(itemsSource: OuiMenus | OuiMenuCreator) {
  let app: any

  // todo this would require to use it top level always
  // onBeforeUnmount(() => app?.done())

  return (...args: any) => {
    // log('useMenu trigger', args)

    // Find and handle event
    const event = args.find((a: any) => a instanceof Event) as MouseEvent
    const { clientX: x, clientY: y, target } = event

    let reference
    // let popoverTarget: any = {
    //   getBoundingClientRect: generateGetBoundingClientRect(x + 4, y + 4),
    // }

    // Uses containing BUTTON if available
    let cursor: HTMLElement | null = target as any
    while (cursor) {
      if (cursor.tagName?.toUpperCase() === 'BUTTON') {
        reference = cursor
        break
      }
      cursor = cursor.parentElement
    }

    // cursor?.classList.add("menuVisible") // todo highlight selected item

    // function generateGetBoundingClientRect(x = 0, y = 0) {
    //   return () => ({
    //     width: 0,
    //     height: 0,
    //     top: y,
    //     right: x,
    //     bottom: y,
    //     left: x,
    //   })
    // }

    // Nothing more to be done with this event
    event.stopPropagation()
    event.preventDefault()

    // Items
    const dynamic = typeof itemsSource === 'function'
    const items = (dynamic ? itemsSource(...args) : itemsSource).filter(item => item != null && item !== false)

    // Cleanup separators at ends and multiple
    const isSeparator = (item: any) => item === null || (isRecord(item) && Object.keys(item).length === 0)

    // log('items', JSON.stringify(items, null, 2))

    for (let i = items.length - 1; i >= 0; i--) {
      if (isSeparator(items[i])) {
        if (i === 0 || i === items.length - 1 || isSeparator(items[i - 1]) || isSeparator(items[i + 1]))
          items.splice(i, 1)
      }
    }

    // log('items', items)

    if (items.length <= 0)
      return

    if (reference) {
      app?.done()
      app = mountComponentAsApp(OuiMenu, {
        items,
        reference,
        args,
      })
      // app.awaitDone.then(() => (app = undefined))
    }
    else {
      // log.warn('useMenu target missing')
    }
  }
}

/** Vue3 Directive! */
export const vMenu = {
  mounted: (el: HTMLElement, binding: DirectiveBinding) => {
    // log("v-menu", el, binding)
    const fn = binding.value
    // log.assert(typeof fn === 'function', 'v-menu requires function as argument')
    el.addEventListener('contextmenu', (ev: MouseEvent) => {
      // log('v-menu context')
      ev.preventDefault() // no system menu
      binding.value(ev)
    })

    el.addEventListener('click', (ev: MouseEvent) => {
      // log('v-menu click')
      binding.value(ev)
    })
  },
}
