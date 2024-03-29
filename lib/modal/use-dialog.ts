import type { Component } from 'vue'
import { useDispose } from 'zeed'
import { mountComponentAsApp } from '../basic/app-helper'
import OuiDialog from './oui-dialog.vue'

/** Environment for JS dialog replacements */
export function useDialog<T extends Component>(component?: T) {
  let cancel: any

  async function showDialog<T>(props: any) {
    const dialogApp = mountComponentAsApp<T>(component ?? OuiDialog, props)
    cancel = dialogApp.cancel
    return dialogApp.awaitDone
  }

  const dispose = useDispose()
  dispose.add(() => cancel?.())

  // todo this is called outside of setup!
  // onBeforeUnmount(dispose)

  return {
    dispose,
    async alert(this: void, message: string) {
      return await showDialog<void>({
        message,
        cancel: 'OK',
        mode: 'alert',
      })
    },
    async confirm(this: void, message: string) {
      return await showDialog<boolean>({
        message,
        mode: 'confirm',
      })
    },
    async prompt(this: void, message: string, dft?: string) {
      return (await showDialog<string | null>({
        message,
        defaultValue: dft ?? '',
        mode: 'prompt',
      })) as string
    },
    async dialog(this: void, props: any) {
      return await showDialog(props)
    },
    async open(this: void, props?: any) {
      return await showDialog(props ?? {})
    },
  }
}
