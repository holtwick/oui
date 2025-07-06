import type { DisposerFunction } from 'zeed'
import { arrayRemoveElement } from 'zeed'

let isEnterPressed = false

const hooks: (() => void)[] = []

/**
 * Helper to check if enter is pressed and hook on release.
 * If enter is pressed, the function will be called immediately.
 * If enter is not pressed, the function will be called when enter is released.
 */
export function onEnterFree(onEnter: () => void, onFail: () => void): DisposerFunction | undefined {
  if (isEnterPressed) {
    hooks.push(onEnter)
    onFail()
    return () => arrayRemoveElement(hooks, onEnter)
  }
  onEnter()
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    isEnterPressed = true
  }
})

window.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    isEnterPressed = false
  }
  while (hooks.length > 0) {
    const hook = hooks.shift()
    hook?.()
  }
})
