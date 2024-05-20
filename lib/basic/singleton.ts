import { onUnmounted } from 'vue'
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'

const log: LoggerInterface = Logger('singleton')

export function useSingleton(name: string) {
  const g = globalThis as any
  g.__ouiSingletons = g.__ouiSingletons ?? {}
  if (g.__ouiSingletons[name] === true) {
    log.warn(`Singleton ${name} can only be instantiated once!`)
    return false
  }
  g.__ouiSingletons[name] = true
  onUnmounted(() => g.__ouiSingletons[name] = false)
}
