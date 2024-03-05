/**
 * Options for notifications.
 *
 * - By default they disappear ion `timeout`. `-1` stays forever.
 * - Line feeds in `message` are preserved.
 * - `onAction` is called if not `cancel` or `x` is clicked.
 * - If `onCancel` is available, two buttons are shown.
 * - `actionLabel` defaults to "OK" and `cancelLabel` to "Cancel"
 * - `onClose` is called when notification disappeared.
 * - The body is only clickable, if not buttons are shown.
 */
export interface AppNotificationSetup {
  id?: string
  mode?: 'warn' | 'error' | 'info'
  active?: boolean
  icon?: string
  title: string
  message?: string
  timeout?: number
  onAction?: () => void
  onCancel?: () => void
  onClose?: () => void
  actionLabel?: string
  cancelLabel?: string
}

export interface AppNotificationInfo extends AppNotificationSetup {
  id: string
  mode: 'warn' | 'error' | 'info'
  active: boolean
  icon: string
  timeout: number
  close: () => void
  action: () => void
}
