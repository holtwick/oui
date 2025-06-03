<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core'
import { reactive } from 'vue'
import { uuid } from 'zeed'
import { OuiCheckbox, OuiDemo, OuiLog, OuiText, useLog } from '@/lib'

const log = useLog('test')

const state = reactive({
  showTime: true,
  showTag: true,
})

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
  <OuiText>
    <h2>Virtual List</h2>
    <div>
      <OuiLog
        :key="`${state.showTag}-${state.showTime}`"
        :log="log"
        style="height: 200px;"
        :show-tag="state.showTag"
        :show-time="state.showTime"
      />
    </div>
  </OuiText>
  <OuiDemo :state="state">
    <OuiCheckbox v-model="state.showTime" switch title="showTime" />
    <OuiCheckbox v-model="state.showTag" switch title="showTag" />
  </OuiDemo>
</template>
