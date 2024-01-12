import type { Ref } from 'vue'
import { reactive, ref } from 'vue'
import type { AppNotificationInfo, AppNotificationSetup } from './_types'

const LIMIT = 6

// const log = Logger('notification')

export const notifications: Ref<AppNotificationInfo[]> = ref([])

export function closeNotification(id?: string) {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index >= 0) {
    notifications.value[index]?.onClose?.()
    notifications.value.splice(index, 1)
  }
}

export function _emitNotification(n: AppNotificationSetup): AppNotificationInfo {
  if (!n.id)
    n.id = `oui-notification-${String(Math.random())}`
  if (!n.active)
    n.active = true
  if (!n.icon)
    n.icon = 'info'
  if (!n.mode)
    n.mode = 'info'
  if (n.timeout == null)
    n.timeout = 5 * 1000

  if (n.timeout > 0) {
    setTimeout(() => {
      n.active = false
      closeNotification(n.id)
    }, n.timeout)
  }

  const ni = n as AppNotificationInfo

  ni.action = () => {
    ni.onAction?.()
    closeNotification(ni.id)
  }

  ni.close = () => {
    ni.onCancel?.()
    closeNotification(ni.id)
  }

  // Delay a bit, so the focus is more on the new entry for now
  setTimeout(() => {
    if (notifications.value.length > LIMIT)
      notifications.value.pop()
  }, 1500)

  notifications.value.unshift(ni)
  return ni
}

export function emitNotification(n: AppNotificationSetup): AppNotificationInfo {
  return _emitNotification(n)
}

export function emitNotificationWarn(
  title: string,
  message?: string,
): AppNotificationInfo {
  return emitNotification({
    icon: 'warning',
    mode: 'warn',
    title,
    message,
    timeout: -1,
  })
}

export function emitNotificationError(
  title: string,
  message?: string,
  timeout?: number,
): AppNotificationInfo {
  return emitNotification({
    icon: 'warning',
    mode: 'error',
    title,
    message,
    timeout: timeout || -1,
  })
}

export const developerLog = reactive<any[]>([])

export function emitNotificationLog(
  title: string,
  message?: string,
): AppNotificationInfo | undefined {
  // if (DEBUG) {
  developerLog.unshift({ title, message })
  return emitNotification({
    title,
    message,
    timeout: 2e3,
  })
  // }
}

export function useNotification(
  n: AppNotificationSetup = {
    title: 'title is missing!',
  },
) {
  return (nn: AppNotificationInfo) => {
    emitNotification(Object.assign({}, n, nn))
  }
}
