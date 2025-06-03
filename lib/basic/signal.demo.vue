<script lang="ts" setup>
import type { Ref, UnwrapRef } from 'vue'
import type { LoggerInterface, Signal } from 'zeed'
import { onUnmounted, ref, watch } from 'vue'
import { Logger, useSignal } from 'zeed'
import { OuiButton, OuiCheckbox, OuiText } from '@/lib'

const log: LoggerInterface = Logger('test-signal')

function useSignalRef<T>(signal: Signal<T>, readwrite = true): Ref<UnwrapRef<T>> {
  const signalVue = ref<T>(signal.get())
  onUnmounted(signal.on(v => signalVue.value = v as any))
  if (readwrite)
    watch(signalVue, v => signal.set(v as any))
  return signalVue as Ref<UnwrapRef<T>>
}

// Connect
const signal = useSignal(true)
const signalVue = useSignalRef(signal)

onUnmounted(signal.on(v => log(`new signal value = ${v}`)))
</script>

<template>
  <OuiText>
    <h1>useSignal</h1>
    <p>Demonstration of a bidirectional binding between zeed framework <tt>useSignal</tt> and a Vue reactive value. More of academic interest than practical one ;) </p>

    <p>
      <OuiCheckbox v-model="signalVue" type="checkbox" switch />
      Represent signalVue: <tt>{{ signalVue }}</tt>
    </p>

    <p>
      <OuiButton @click="signal.set(!signal.get())">
        toggle signal
      </OuiButton>
    </p>
  </OuiText>
</template>
