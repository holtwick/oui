# oui-day-range

This component use the external [v-calendar](https://vcalendar.io/getting-started/installation.html) component. Make sure to add it to your apps `package.json` and also place an import for their CSS into you apps code:

```ts
import 'v-calendar/style.css'
```

For the date the `day` format (integer number like YYYYMMDD) supported by [zeed](https://github.com/holtwick/zeed/blob/ab3b88a3093932ea393bad9464b153cc2a42e19d/src/common/data/day.ts) is used.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | The title displayed above the date range picker. |
| `description` | `string` | `undefined` | The description displayed below the title. |
| `required` | `boolean` | `false` | Whether the date range selection is required. |
| `id` | `string` | `undefined` | The ID attribute for the form item. |

## Models

| Model | Type | Description |
|-------|------|-------------|
| `startDay` | `DayValue` | The start day of the selected date range (required). |
| `endDay` | `DayValue` | The end day of the selected date range (required). |
| `periodType` | `PeriodType` | The type of period selected ('day', 'week', 'month', 'year', 'custom'). |

## Slots

| Slot | Description |
|------|-------------|
| `selectors` | Additional selector buttons placed between the date picker and navigation buttons. |
| (default) | Content placed after the date range controls. |

## PeriodType

The `PeriodType` is a string type that defines the nature of the selected date range period. It influences how the component handles navigation and presets. The possible values are:

- `'day'`: Represents a single day period.
- `'week'`: Represents a week-long period (typically Monday to Sunday, based on `firstDayOfWeek`).
- `'month'`: Represents a calendar month period.
- `'year'`: Represents a calendar year period.
- `'custom'`: Represents a custom date range that doesn't fit the standard periods.

When a preset is selected or the date range is manually adjusted, the `periodType` is automatically set to reflect the type of period. For example, selecting "This Week" sets `periodType` to `'week'`, while manually selecting a custom range sets it to `'custom'`.

The `periodType` is used internally for navigation: the previous/next buttons (`←` and `→`) shift the date range by one period unit based on the current `periodType`. For instance, if `periodType` is `'month'`, clicking the next button will advance the range to the next month.

```ts
type PeriodType = 'day' | 'week' | 'month' | 'year' | 'custom'
```

## Example

```vue
<template>
  <OuiDayRange
    v-model:start-day="state.start"
    v-model:end-day="state.end"
    v-model:period-type="state.periodType"
    title="Select Date Range"
    description="This is a demo of the OuiDayRange component"
    :required="true"
  />
</template>

<script setup>
import { ref } from 'vue'
import { today } from 'zeed'

const state = ref({
  start: today,
  end: today,
  periodType: 'day' as const,
})
</script>
```

## Date Presets

The component includes built-in date presets for quick selection:

- Today
- Yesterday
- Last 7 Days
- Last 30 Days
- Last 90 Days
- Last 365 Days
- Last Week
- This Week
- This Month
- Last Month
- This Year
- Last Year
- All Time

## Navigation

The component provides navigation buttons to move to the previous or next period based on the current `periodType`.
