<script lang="ts" setup>
import { OuiDatetime, OuiDemo, OuiFormItem, OuiInput, OuiInputNumber, OuiPassword, OuiSelect, OuiTextarea } from '@/lib'
import { reactive } from 'vue'
import { getTimestamp } from 'zeed'

const state = reactive({
  value1: '',
  value2: '',
  number: 42,
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis velit, distinctio adipisci culpa, numquam impedit hic consequuntur unde illo illum sunt aliquid aut beatae natus? Repellendus vel laborum doloribus tempore?',
  password: 'Secr3!',
  select: '',
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
    <OuiDatetime v-model="state.datetime" title="Date and Time" />
  </div>
  <OuiDemo :state="state" />
</template>
