<!-- eslint-disable no-alert -->
<script setup lang="ts">
import { emitNotification, emitNotificationError, emitNotificationWarn, OuiButton, OuiNotificationActivator } from '@/lib'

function triggerAll() {
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
      '[forever] Das Luftkissenfahrzeug ist voller Aale! Das Luftkissenfahrzeug ist voller Aale! Das Luftkissenfahrzeug ist voller Aale! Das Luftkissenfahrzeug ist voller Aale! ',
    timeout: -1,
    onAction: () => alert('test'),
  })

  emitNotificationWarn('Warning', '[2s] Something happened!', 2000)
  emitNotificationError('Error [forever]')
  emitNotificationError(
    'Only title, but very very looooong looooong looooong looooong [3s]',
    undefined,
    3000, // 3 seconds
  )

  emitNotification({
    title: 'Choose',
    message:
      '[forever] Option:\n1. One\n2. Two\nDas Luftkissenfahrzeug ist voller Aale! Das Luftkissenfahrzeug ist voller Aale! Das Luftkissenfahrzeug ist voller Aale! Das Luftkissenfahrzeug ist voller Aale!',
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
}
</script>

<template>
  <OuiText>
    <p>
      <OuiButton @click="triggerAll">
        Trigger All
      </OuiButton>
    </p>
  </OuiText>
  <OuiNotificationActivator />
</template>
