import type { DisposerFunction } from 'zeed'
import { ref } from 'vue'
import { arrayRemoveElement } from 'zeed'

export const isEnterPressed = ref(false)

const hooks: (() => void)[] = []

/**
 * Helper to check if enter is pressed and hook on release.
 * If enter is pressed, the function will be called immediately.
 * If enter is not pressed, the function will be called when enter is released.
 */
export function onEnterFree(onEnter: () => void, onFail: () => void): DisposerFunction | undefined {
  if (isEnterPressed.value) {
    hooks.push(onEnter)
    onFail()
    return () => arrayRemoveElement(hooks, onEnter)
  }
  onEnter()
}

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      isEnterPressed.value = true
    }
  })

  window.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      isEnterPressed.value = false
    }
    while (hooks.length > 0) {
      const hook = hooks.shift()
      hook?.()
    }
  })
}
