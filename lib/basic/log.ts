import type { LoggerInterface, LogMessage } from 'zeed'
import { reactive } from 'vue'
import { LoggerContext, LoggerMemoryHandler, LogLevelAll } from 'zeed'

export type LogOui = LoggerInterface & {
  messages: LogMessage[]
}

export function useLog(name?: string): LogOui {
  const messages: LogMessage[] = reactive([])
  const logger = LoggerContext()
  logger.setHandlers([
    LoggerMemoryHandler({
      level: LogLevelAll,
      filter: '*',
      messages,
    }),
  ])
  const log = logger(name) as any
  log.messages = messages
  return log
}
