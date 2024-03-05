import type { DirectiveBinding } from 'vue'
import { isRecord } from 'zeed'
import OuiMenu from './oui-menu.vue'
import type { OuiMenuItem } from './_types'
import { mountComponentAsApp } from './app-helper'

type OuiMenuCreator = (...args: any) => OuiMenuItem[]

function generateGetBoundingClientRect(x = 0, y = 0) {
  return () => ({
    width: 0,
    height: 0,
    top: y,
    right: x,
    bottom: y,
    left: x,
  } as DOMRect)
}

/**
 * Context menu emulation.
 *
 * If triggered by BUTTON it will show as a drop down, else close to the mouse position.
 */
export function useMenu(itemsSource: (OuiMenuItem | false | undefined | null)[] | OuiMenuCreator) {
  let app: any

  // todo this would require to use it top level always
  // onBeforeUnmount(() => app?.done())

  return (...args: any) => {
    // log('useMenu trigger', args)

    // Find and handle event
    const event = args.find((a: any) => a instanceof Event) as MouseEvent
    const { clientX: x, clientY: y, target } = event

    let cursor: HTMLElement | null = target as any

    let reference: HTMLElement | undefined | null

    // Uses containing BUTTON if available
    while (cursor) {
      if (cursor.tagName?.toUpperCase() === 'BUTTON') {
        reference = cursor
        break
      }
      cursor = cursor.parentElement
    }

    if (reference == null && target != null) {
      reference = target as any
      reference!.getBoundingClientRect = generateGetBoundingClientRect(x + 4, y + 4)
    }

    // cursor?.classList.add("menuVisible") // todo highlight selected item

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
  mounted: (element: HTMLElement, binding: DirectiveBinding) => {
    // log("v-menu", el, binding)
    // log.assert(typeof fn === 'function', 'v-menu requires function as argument')
    element.addEventListener('contextmenu', (event: MouseEvent) => {
      // log('v-menu context')
      event.preventDefault() // no system menu
      binding.value(event, element)
    })

    element.addEventListener('click', (event: MouseEvent) => {
      // log('v-menu click')
      binding.value(event, element)
    })
  },
}
