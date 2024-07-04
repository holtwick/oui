<script lang="ts" setup>
import { useIntervalFn, useTimeoutFn } from '@vueuse/core'
import { uuid } from 'zeed'
import { OuiLog, useLog } from '@/lib'

const log = useLog('test')

log('Hello World')
log.info('Info')
log.warn('Warning')
log.error('Error')

log('Some binary data', new Uint8Array([1, 2, 3, 99, 100, 101]))

useIntervalFn(() => {
  log(`interval ${uuid()}`)
}, 1000)
</script>

<template>
  <h2>Virtual List</h2>
  <div>
    <OuiLog :log="log" />
  </div>
</template>
