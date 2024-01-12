<!-- eslint-disable no-alert -->
<script setup lang="ts">
import { OuiNotificationActivator, emitNotification, emitNotificationError, emitNotificationWarn } from '../lib/main'

setTimeout(() => {
  // setInterval(() => {
  //   emitNotification({
  //     icon: "questions",
  //     title: uuid(),
  //     timeout: 10e3,
  //   })
  // }, 1e3)

  emitNotification({
    title: 'Some fake chat',
    message:
      'Das Luftkissenfahrzeug ist voller Aale! Das Luftkissenfahrzeug ist voller Aale! Das Luftkissenfahrzeug ist voller Aale! Das Luftkissenfahrzeug ist voller Aale!',
    timeout: -1,
    onAction: () => alert('test'),
  })

  emitNotificationWarn('Warning', 'Something happened!')
  emitNotificationError('Error')
  emitNotificationError(
    'Only title, but very very looooong looooong looooong looooong',
  )

  emitNotification({
    title: 'Choose',
    message:
      'Option:\n1. One\n2. Two\nDas Luftkissenfahrzeug ist voller Aale! Das Luftkissenfahrzeug ist voller Aale! Das Luftkissenfahrzeug ist voller Aale! Das Luftkissenfahrzeug ist voller Aale!',
    timeout: -1,
    mode: 'warn',
    actionLabel: 'Ok for any option',
    onAction: () => alert('ok'),
    onCancel: () => alert('cancel'),
  })

  // emitNotification({
  //   title: 'Choose',
  //   message:
  //   'Option:\n1. One\n2. Two\nDas Luftkissenfahrzeug ist voller Aale! Das Luftkissenfahrzeug ist voller Aale! Das Luftkissenfahrzeug ist voller Aale! Das Luftkissenfahrzeug ist voller Aale!',
  //   timeout: -1,
  //   mode: 'error',
  //   actionLabel: 'Ok for any option',
  //   onAction: () => alert('ok'),
  //   onCancel: () => alert('cancel'),
  // })

  // emitNotification({
  //   title: 'Choose',
  //   message:
  //   'Option:\n1. One\n2. Two\nDas Luftkissenfahrzeug ist voller Aale! Das Luftkissenfahrzeug ist voller Aale! Das Luftkissenfahrzeug ist voller Aale! Das Luftkissenfahrzeug ist voller Aale!',
  //   timeout: -1,
  //   actionLabel: 'Ok for any option',
  //   onAction: () => alert('ok'),
  //   onCancel: () => alert('cancel'),
  // })

  // if (isNotificationAllowed("questions")) {
  //   emitNotificationError("VISIBLE", "Bad news...")
  // }
}, 1000)
</script>

<template>
  <div>
    <h1>Oui</h1>
    <p>Just another set of UI components for Vue.js with a proper French-sounding name</p>
  </div>
  <OuiNotificationActivator />
</template>
