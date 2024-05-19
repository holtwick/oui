import type { App, Component } from 'vue'
import { createApp } from 'vue'

/** Creates a temporary Vue app from a widget, useful e.g. for menus. */
export function mountComponentAsApp<T>(
  component: Component,
  props: Record<string, any>,
  delay?: number,
) {
  let container: HTMLElement | undefined
  let app: App | undefined
  let resolveFn: ((r: any) => void) | undefined
  const awaitDone = new Promise<T>(resolve => (resolveFn = resolve))

  /** Call this to dispose everything */
  const done = (value?: any) => {
    function remove() {
      app?.unmount()
      app = undefined
      container?.remove()
      container = undefined
    }
    if (delay != null && delay > 0)
      setTimeout(remove, delay)
    else
      remove()

    resolveFn?.(value)
    resolveFn = undefined
  }

  const cancel = () => {
    done(undefined)
  }

  // Actually mount the component
  container = document.createElement('div')
  document.body.appendChild(container)
  app = createApp(component, {
    ...props,
    done,
    // t,
    // $t: t,
  } as any)
  app.mount(container)

  return {
    app,
    done,
    cancel,
    awaitDone,
  }
}
