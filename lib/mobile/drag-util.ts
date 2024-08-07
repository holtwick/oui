import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'

const log: LoggerInterface = Logger('drag-util')

export function isInsideScrollable(el?: HTMLElement | null, childOf?: HTMLElement) {
  // Figure out, if we are inside an element with custom scrolling

  // log('isInsideScrollable', el, childOf, childOf?.contains(el))
  while (el != null) {
    if (childOf && (!childOf?.contains(el) || childOf.isSameNode(el)))
      return false

    if (el.dataset.noscroll === 'true') {
      log('exit noscroll')
      return true
      // break
    }
    if (el.tagName === 'BODY') {
      log('exit body')
      return true
    }
    const { overflow } = window.getComputedStyle(el)
    if (overflow.split(' ').some(o => o === 'auto' || o === 'scroll')) {
      log('exit scroll', el.scrollTop, overflow)
      // if (el.scrollTop <= 0)
      //   return false
      return true
    }
    el = el.parentElement
  }
  return false
}
