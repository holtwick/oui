<script lang="ts" setup>
import { reactive } from 'vue'
import { dayFromToday } from 'zeed'
import { OuiDayRange, OuiDemo, OuiInput, OuiInputNumber } from '@/lib'

const state = reactive({
  start: dayFromToday(),
  end: dayFromToday(),
  periodType: undefined,
})
</script>

<template>
  <div>
    <OuiDayRange
      v-model:start-day="state.start"
      v-model:end-day="state.end"
      v-model:period-type="state.periodType"
      title="Select Date Range"
      description="This is a demo of the OuiDayRange component"
      :required="true"
    />
  </div>
  <OuiDemo :state="state">
    <OuiInputNumber v-model="state.start" title="startDay" />
    <OuiInputNumber v-model="state.end" title="endDay" />
    <OuiInput v-model="state.periodType" title="periodType" />
  </OuiDemo>
</template>
