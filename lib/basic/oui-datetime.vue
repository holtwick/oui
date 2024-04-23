<script lang="ts" setup>
import { computed } from 'vue'
import { getTimestamp } from 'zeed'

import './oui-form.styl'

const model = defineModel<number>({
  required: true,
  default: getTimestamp(),
})

const date = computed({
  get() {
    const mdate = new Date(model.value)
    const date = new Date()
    date.setUTCFullYear(mdate.getFullYear())
    date.setUTCMonth(mdate.getMonth())
    date.setUTCDate(mdate.getDate())
    date.setUTCHours(mdate.getHours())
    date.setUTCMinutes(mdate.getMinutes())
    date.setUTCSeconds(mdate.getSeconds())
    date.setUTCMilliseconds(mdate.getMilliseconds())
    return date.toISOString().slice(0, 16)
  },
  set(value) {
    const [y, m, d, hh, mm] = value.replace(/[^\d]/gim, ' ').split(' ')
    const date = new Date()
    date.setFullYear(+y)
    date.setMonth(+m - 1)
    date.setDate(+d)
    date.setHours(+hh)
    date.setMinutes(+mm)
    date.setSeconds(0)
    date.setMilliseconds(0)
    model.value = date.getTime()
  },
})
</script>

<template>
  <input v-model="date" type="datetime-local" class="oui-input">
</template>
