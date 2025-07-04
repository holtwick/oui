<script lang="ts" setup>
import type { OuiTab } from '../lib'
import { reactive } from 'vue'
import { OuiClose, OuiDemo, OuiInput, OuiTabs } from '../lib'

import './oui-tabs.demo.styl'

const state = reactive({
  selected: 'one',
})

const tabs: OuiTab[] = [
  { title: 'Income', name: 'one', icon: OuiClose, pillClass: '_green' },
  { title: 'Expense', name: 'two', pillClass: '_red' },
  { title: 'Other', name: 'three', pillClass: '_yellow' },
]
</script>

<template>
  <h2>Tabs</h2>
  <p>
    <OuiTabs
      v-model="state.selected"
      :tabs="tabs"
    >
      <template #one>
        One
      </template>
      <template #two>
        Two
      </template>
    </OuiTabs>
  </p>

  <p>
    <OuiTabs
      v-model="state.selected"
      :tabs="tabs"
    >
      <template #one>
        One
      </template>
      <template #two>
        Two
      </template>
    </OuiTabs>
  </p>

  <OuiDemo :state="state">
    <OuiInput v-model="state.selected" title="Selected" />
  </OuiDemo>
</template>
