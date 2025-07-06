<script lang="ts" setup>
import { reactive } from 'vue'
import { dayFromToday, getTimestamp } from 'zeed'
import { OuiButton, OuiCheckbox, OuiCombobox, OuiDate, OuiDatetime, OuiDemo, OuiFormItem, OuiInput, OuiInputColor, OuiInputNumber, OuiPassword, OuiSelect, OuiTextarea } from '@/lib'

const state = reactive({
  value1: '',
  value2: '',
  color: '#ff0000',
  number: 42,
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis velit, distinctio adipisci culpa, numquam impedit hic consequuntur unde illo illum sunt aliquid aut beatae natus? Repellendus vel laborum doloribus tempore?',
  password: 'Secr3!',
  select: '',
  date: dayFromToday(),
  datetime: getTimestamp(),
  disabled: false,
  lazy: false,
})
</script>

<template>
  <div>
    <OuiFormItem :disabled="state.disabled" title="TITLE" description="DESCRIPTION" required>
      BODY
    </OuiFormItem>
    <OuiInputColor v-model="state.color" :disabled="state.disabled" title="Color" :lazy="state.lazy" />
    <OuiInputColor v-model="state.color" :disabled="state.disabled" title="Color (echo)" :lazy="state.lazy" />
    <OuiInput v-model="state.value1" :disabled="state.disabled" :lazy="state.lazy" />
    <OuiInput v-model="state.value2" :disabled="state.disabled" title="Value with label" description="Some description" required :lazy="state.lazy" />
    <OuiInputNumber v-model="state.number" :disabled="state.disabled" title="Number" :lazy="state.lazy" />
    <OuiTextarea v-model="state.text" :disabled="state.disabled" title="Text" :lazy="state.lazy" />
    <OuiTextarea v-model="state.text" :disabled="state.disabled" title="Text (autosize)" autosize :lazy="state.lazy" />
    <OuiPassword v-model="state.password" :disabled="state.disabled" title="Password" :lazy="state.lazy" />
    <OuiCombobox v-model="state.select" :disabled="state.disabled" title="Combobox" :items="['One', 'Two', 'Three']" clearable :lazy="state.lazy" />
    <OuiCombobox v-model="state.select" :disabled="state.disabled" title="Combobox" :items="['One', 'Two', 'Three']" :lazy="state.lazy" />
    <OuiSelect v-model="state.select" segmented :disabled="state.disabled" title="Select" :options="['One', 'Two', 'Three']" />
    <OuiSelect v-model="state.select" :disabled="state.disabled" title="Select" :options="['One', 'Two', 'Three']" />
    <OuiSelect v-model="state.select" :disabled="state.disabled" title="Select" :options="['One', 'Two', 'Three']">
      <template #button>
        <OuiButton dropdown>
          Select: {{ state.select }}
        </OuiButton>
      </template>
    </OuiSelect>
    <OuiSelect v-model="state.select" :disabled="state.disabled" title="Select" :options="[[1, 'One'], [2, 'Two'], [3, 'Three']]" button="Select" />
    <OuiDate v-model="state.date" :disabled="state.disabled" title="Date" :lazy="state.lazy" />
    <OuiDatetime v-model="state.datetime" :disabled="state.disabled" title="Date and Time" :lazy="state.lazy" />
  </div>
  <OuiDemo :state="state">
    <OuiCheckbox v-model="state.disabled" switch title="Disabled" />
    <OuiCheckbox v-model="state.lazy" switch title="Lazy" />
  </OuiDemo>
</template>
