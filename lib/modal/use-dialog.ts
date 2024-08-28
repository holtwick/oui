import type { Component } from 'vue'
import { useDispose } from 'zeed'
import { mountComponentAsApp } from '../basic/app-helper'
import OuiDialog from './oui-dialog.vue'

/** Environment for JS dialog replacements */
export function useDialog<T extends Component>(component?: T) {
  let cancel: any

  async function showDialog<T>(props: any) {
    const dialogApp = mountComponentAsApp<T>(component ?? OuiDialog, props, 400)
    cancel = dialogApp.cancel

    // This will fix focussing on iOS, because it only works onClick
    // A workaround would also be to focus a hidden input field on click
    // and then focus the right one, because switching focus fields
    // also works programmatically. It might also work with setTimeout...
    const el = document.querySelector('._focus') as HTMLElement
    if (el)
      el.focus()

    const result = dialogApp.awaitDone

    return result
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
      return await showDialog({
        mode: 'dialog',
        ...props,
      })
    },
    async open(this: void, props?: any) {
      return await showDialog({
        ...props,
      })
    },
  }
}

export function dialogOpen<T = any>(component: Component, props?: T) {
  const { open } = useDialog(component)
  open(props)
}

export function useDialogOpen(component: Component) {
  const { open } = useDialog(component)
  return open
}
