import { onBeforeUnmount } from 'vue'
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'

const log: LoggerInterface = Logger('singleton')

/** In an app only have one Vue Component of it at all, like OuiXXXActivator */
export function useSingleton(name: string) {
  const g = globalThis as any
  g.__ouiSingletons = g.__ouiSingletons ?? {}
  if (g.__ouiSingletons[name] === true) {
    log.warn(`Singleton ${name} can only be instantiated once!`)
    return false
  }
  g.__ouiSingletons[name] = true
  onBeforeUnmount(() => g.__ouiSingletons[name] = false)
  return true
}

/** In an app can only have one object of this type */
export function createSingleton<T>(name: string, create: () => T): T { // dispose?: UseDispose
  const g = globalThis as any
  g.__ouiSingletonObjects = g.__ouiSingletonObjects ?? {}
  let value = g.__ouiSingletonObjects[name] as T | undefined
  if (value == null) {
    value = create()
    g.__ouiSingletonObjects[name] = create()
  }
  return value
}
