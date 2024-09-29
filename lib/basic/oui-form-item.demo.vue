<script lang="ts" setup>
import { OuiDate, OuiDatetime, OuiDemo, OuiFormItem, OuiInput, OuiInputNumber, OuiPassword, OuiSelect, OuiTextarea } from '@/lib'
import { reactive } from 'vue'
import { dayFromToday, getTimestamp } from 'zeed'

const state = reactive({
  value1: '',
  value2: '',
  number: 42,
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis velit, distinctio adipisci culpa, numquam impedit hic consequuntur unde illo illum sunt aliquid aut beatae natus? Repellendus vel laborum doloribus tempore?',
  password: 'Secr3!',
  select: '',
  date: dayFromToday(),
  datetime: getTimestamp(),
})
</script>

<template>
  <div>
    <OuiFormItem title="TITLE" description="DESCRIPTION" required>
      BODY
    </OuiFormItem>
    <OuiInput v-model="state.value1" />
    <OuiInput v-model="state.value2" title="Value with label" description="Some description" required />
    <OuiInputNumber v-model="state.number" title="Number" />
    <OuiTextarea v-model="state.text" title="Text" />
    <OuiPassword v-model="state.password" title="Password" />
    <OuiSelect v-model="state.select" title="Select" :options="['One', 'Two', 'Three']" />
    <OuiDate v-model="state.date" title="Date" />
    <OuiDatetime v-model="state.datetime" title="Date and Time" />
  </div>
  <OuiDemo :state="state" />
</template>
