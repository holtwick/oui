<script setup lang="ts">
import type { DayValue } from 'zeed'
import type { PeriodType } from './oui-day-range.lib'
import { computed, defineAsyncComponent, nextTick, ref } from 'vue'
import { dayFromDate, dayFromString, dayOffset, dayToDate, dayToString } from 'zeed'
import OuiFloat from '../float/oui-float.vue'
import OuiButton from './oui-button.vue'
import { dayRangeMonth, dayRangePeriod, dayRangeWeek, dayRangeYear, firstDayOfWeek, today } from './oui-day-range.lib'
import OuiFormItem from './oui-form-item.vue'

import './oui-day-range.styl'

defineOptions({
  inheritAttrs: false,
})

withDefaults(defineProps<{
  title?: string
  description?: string
  required?: boolean
  id?: string
}>(), {})

const DatePicker = defineAsyncComponent(async () => (await import('v-calendar')).DatePicker)

const startDay = defineModel<DayValue>('startDay', { required: true })
const endDay = defineModel<DayValue>('endDay', { required: true })
const periodType = defineModel<PeriodType>('periodType', { required: false })

const showPicker = ref(false)

// Close the picker
function closePicker() {
  nextTick(() => {
    showPicker.value = false
  })
}

// Computed properties for v-calendar compatibility
const vdateRange = computed<{ start: Date, end: Date }>({
  get: () => ({
    start: dayToDate(startDay.value),
    end: dayToDate(endDay.value),
  }),
  set: (val) => {
    const didChange = startDay.value !== dayFromDate(val.start) || endDay.value !== dayFromDate(val.end)
    startDay.value = dayFromDate(val.start)
    endDay.value = dayFromDate(val.end)
    if (didChange) {
      periodType.value = 'custom'
      // Close picker when both dates are selected
      if (val.start && val.end) {
        closePicker()
      }
    }
  },
})

const selectedDateFormatted = computed(() => {
  if (startDay.value && endDay.value) {
    const startDate = dayToString(startDay.value)
    const endDate = dayToString(endDay.value)
    if (startDate === endDate) {
      return startDate
    }
    return `${startDate} - ${endDate}`
  }
  return ''
})

// Quick date selection methods - unified function
function setDateRange(start: DayValue, end: DayValue, titleText: string, periodTypeValue: PeriodType = 'custom') {
  startDay.value = start
  endDay.value = end
  periodType.value = periodTypeValue
  closePicker()
}

// Date range presets configuration
const datePresets = [
  {
    label: 'Today',
    handler: () => setDateRange(today, today, 'Today', 'day'),
  },
  {
    label: 'Yesterday',
    handler: () => setDateRange(dayOffset(today, -1), dayOffset(today, -1), 'Yesterday', 'day'),
  },
  {
    label: 'Last 7 Days',
    handler: () => setDateRange(dayOffset(today, -6), today, 'Last 7 Days'),
  },
  {
    label: 'Last 30 Days',
    handler: () => setDateRange(dayOffset(today, -29), today, 'Last 30 Days'),
  },
  {
    label: 'Last 90 Days',
    handler: () => setDateRange(dayOffset(today, -89), today, 'Last 90 Days'),
  },
  {
    label: 'Last 365 Days',
    handler: () => setDateRange(dayOffset(today, -364), today, 'Last 365 Days'),
  },
  {
    label: 'Last Week',
    handler: () => {
      const [start, end] = dayRangeWeek(today, -1)
      setDateRange(start, end, 'Last Week', 'week')
    },
  },
  {
    label: 'This Week',
    handler: () => {
      const [start, end] = dayRangeWeek(today)
      setDateRange(start, end, 'This Week', 'week')
    },
  },
  {
    label: 'This Month',
    handler: () => {
      const [start, end] = dayRangeMonth(today)
      setDateRange(start, end, 'This Month', 'month')
    },
  },
  {
    label: 'Last Month',
    handler: () => {
      const [start, end] = dayRangeMonth(today, -1)
      setDateRange(start, end, 'Last Month', 'month')
    },
  },
  {
    label: 'This Year',
    handler: () => {
      const [start, end] = dayRangeYear(today)
      setDateRange(start, end, 'This Year', 'year')
    },
  },
  {
    label: 'Last Year',
    handler: () => {
      const [start, end] = dayRangeYear(today, -1)
      setDateRange(start, end, 'Last Year', 'year')
    },
  },
  {
    label: 'All Time',
    handler: () => {
      const startDate = dayFromString('2000-01-01')
      if (startDate) {
        setDateRange(startDate, today, 'All Time')
      }
    },
  },
]

function navigateBackward() {
  [startDay.value, endDay.value] = dayRangePeriod(startDay.value, endDay.value, -1, periodType.value)
}

function navigateForward() {
  [startDay.value, endDay.value] = dayRangePeriod(startDay.value, endDay.value, +1, periodType.value)
}
</script>

<template>
  <OuiFormItem :id="id" :title="title" :description="description" :required="required">
    <!-- Conditionally pass the title slot -->
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>

    <!-- Conditionally pass the description slot -->
    <template v-if="$slots.description" #description>
      <slot name="description" />
    </template>

    <div class="oui-day-range">
      <div class="_daterange oui-input-group">
        <OuiFloat v-model="showPicker" placement="bottom-start" :offset="10" close class="oui-float _dropdown">
          <template #trigger>
            <OuiButton mode="outline" dropdown>
              {{ selectedDateFormatted }}
            </OuiButton>
          </template>
          <div class="oui-day-range-teleport">
            <div>
              <DatePicker v-model="vdateRange" mode="date" :is-range="true" placeholder="Select date range" class="date-picker" :columns="2" show-weeknumbers :first-day-of-week="firstDayOfWeek + 1" :popover="false" />
            </div>
            <div class="_picker_presets -y">
              <OuiButton
                v-for="preset in datePresets"
                :key="preset.label"
                mode="ghost"
                @click="preset.handler"
              >
                {{ preset.label }}
              </OuiButton>
            </div>
          </div>
        </OuiFloat>
        <slot name="selectors" />
        <OuiButton mode="outline" title="Previous period" @click="navigateBackward">
          ←
        </OuiButton>
        <OuiButton mode="outline" title="Next period" @click="navigateForward">
          →
        </OuiButton>
      </div>
      <slot />
    </div>
  </OuiFormItem>
</template>
