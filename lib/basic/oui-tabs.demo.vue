<script lang="ts" setup>
import type { OuiTab } from '../lib'
import { reactive } from 'vue'
import { OuiClose, OuiDemo, OuiInput, OuiTabs } from '../lib'

const state = reactive({
  selected: 'one',
})

const tabs: OuiTab[] = [
  { title: 'One', name: 'one', icon: OuiClose },
  { title: 'Two', name: 'two' },
  { title: 'Three', name: 'three' },
]
</script>

<template>
  <h2>Tabs</h2>
  <div>
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
  </div>

  <OuiDemo :state="state">
    <OuiInput v-model="state.selected" title="Selected" />
  </OuiDemo>
</template>
