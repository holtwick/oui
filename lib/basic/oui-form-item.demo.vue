<script lang="ts" setup>
import { reactive } from 'vue'
import { dayFromToday, getTimestamp } from 'zeed'
import { OuiDate, OuiDatetime, OuiDemo, OuiFormItem, OuiInput, OuiInputNumber, OuiPassword, OuiSelect, OuiTextarea } from '@/lib'
import OuiCheckbox from './oui-checkbox.vue'

const state = reactive({
  value1: '',
  value2: '',
  number: 42,
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis velit, distinctio adipisci culpa, numquam impedit hic consequuntur unde illo illum sunt aliquid aut beatae natus? Repellendus vel laborum doloribus tempore?',
  password: 'Secr3!',
  select: '',
  date: dayFromToday(),
  datetime: getTimestamp(),
  disabled: false,
})
</script>

<template>
  <div>
    <OuiFormItem :disabled="state.disabled" title="TITLE" description="DESCRIPTION" required>
      BODY
    </OuiFormItem>
    <OuiInput v-model="state.value1" :disabled="state.disabled" />
    <OuiInput v-model="state.value2" :disabled="state.disabled" title="Value with label" description="Some description" required />
    <OuiInputNumber v-model="state.number" :disabled="state.disabled" title="Number" />
    <OuiTextarea v-model="state.text" :disabled="state.disabled" title="Text" />
    <OuiTextarea v-model="state.text" :disabled="state.disabled" title="Text (autosize)" autosize />
    <OuiPassword v-model="state.password" :disabled="state.disabled" title="Password" />
    <OuiSelect v-model="state.select" :disabled="state.disabled" title="Select" :options="['One', 'Two', 'Three']" />
    <OuiDate v-model="state.date" :disabled="state.disabled" title="Date" />
    <OuiDatetime v-model="state.datetime" :disabled="state.disabled" title="Date and Time" />
  </div>
  <OuiDemo :state="state">
    <OuiCheckbox v-model="state.disabled" title="Disabled" />
  </OuiDemo>
</template>
