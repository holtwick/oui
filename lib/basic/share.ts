import { Logger } from 'zeed'
import { clipboardCopy } from './clipboard'

const log = Logger('share')

export const canShare = () => navigator.share != null

export async function copyLink(url: string) {
  const w = window as any
  if (w.electron) {
    try {
      // https://electronjs.org/docs/api/clipboard
      await w.electron.clipboard.writeText(url)
      return true
    }
    catch (err) {
      log.warn(err)
    }
  }
  else {
    try {
      await clipboardCopy(url)
      return true
    }
    catch (err) {
      // emitNotificationError('Error', 'Can\'t copy URL, please do by hand.', 20000)
    }
  }
  return false
}

export async function shareLink(
  data: ShareData,
) {
  if (navigator.share) {
    log('nav share')
    try {
      await navigator.share(data)
      return true
    }
    catch (err) {
      log.warn(err)
    }
  }
  return false
}
