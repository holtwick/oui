import type { DirectiveBinding } from 'vue'
import type { LoggerInterface } from 'zeed'
import { Logger, isRecord } from 'zeed'
import { mountComponentAsApp } from '../basic/app-helper'
import OuiMenu from './oui-menu.vue'
import type { OuiMenuItem } from './_types'
import { OuiMenuItems } from '.'

const log: LoggerInterface = Logger('use-menu')

type OuiMenuCreator<T = any> = (value: T, ...args: any) => OuiMenuItem[]
type OuiMenuItemSource = (OuiMenuItem | false | undefined | null)[] | OuiMenuCreator

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

function isSeparator(item: any) {
  return item === null || (isRecord(item) && Object.keys(item).length === 0)
}

/**
 * Context menu emulation.
 *
 * If triggered by BUTTON it will show as a drop down, else close to the mouse position.
 */
export function useMenu(itemsSource: OuiMenuItemSource) {
  let app: any

  // todo this would require to use it top level always
  // onBeforeUnmount(() => app?.done())

  return (...args: any) => {
    log('useMenu trigger', args)

    // Find and handle event
    const event = args.find((a: any) => a instanceof Event) as MouseEvent
    const { clientX: x, clientY: y, target } = event

    // Find reference element. Use containing BUTTON if available
    let reference: HTMLElement | undefined | null
    let cursorElement: HTMLElement | null = target as any
    while (cursorElement) {
      if (cursorElement.tagName?.toUpperCase() === 'BUTTON') {
        reference = cursorElement
        break
      }
      cursorElement = cursorElement.parentElement
    }

    // No element? Then narrow down the coordinates on screen.
    if (reference == null && target != null) {
      reference = target as any
      reference!.getBoundingClientRect = generateGetBoundingClientRect(x + 4, y + 4)
    }

    // cursor?.classList.add("menuVisible") // todo highlight selected item

    // Nothing more to be done with this event
    event.stopPropagation()
    event.preventDefault()

    // Items with empty ones filted out
    const items = (
      typeof itemsSource === 'function'
        ? (itemsSource as any)(...args)
        : itemsSource
    ) .filter((item: any) => item != null && item !== false)

    // Cleanup separators at ends and multiple
    for (let i = items.length - 1; i >= 0; i--) {
      if (isSeparator(items[i])) {
        if (i === 0 || i === items.length - 1 || isSeparator(items[i - 1]) || isSeparator(items[i + 1]))
          items.splice(i, 1)
      }
    }

    log('items', items)

    // No item? Don't show.
    if (items.length <= 0)
      return

    // We have a hook? Then show the menu eventually
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
      log.warn('useMenu target missing')
    }
  }
}

/** Menu function where an argument can be passed, like: `const menu = useMenuWithValue(value => [...])` then in HTML `v-menu="menu(item)"` */
export function useMenuWithValue<T = any>(itemsSource: OuiMenuCreator<T>) {
  const menu = useMenu(itemsSource)
  return (value: T) => {
    return (...args: any) => menu(value, ...args)
  }
}
