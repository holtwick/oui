<script lang="ts" setup>
import type { OuiTableColumn } from '../lib'
import { OuiTable } from '../lib'

function initStateDefault() {
  return {
    sort: '',
    footer: true,
  }
}

const columns: OuiTableColumn[] = [
  { title: '#', name: 'id', sortable: false },
  { title: 'One', name: 'one', sortable: true },
  { title: 'Two', name: 'two', sortable: true, footer: 'Two feet' },
  { title: '', name: 'action', align: 'right' },
]

const data = [
  { id: 1, one: 1, two: 2 },
  { id: 2, one: 11, two: 22 },
  { id: 3, one: 111 }, // missing one
]
</script>

<template>
  <Story auto-props-disabled>
    <template #controls="{ state }">
      <HstText v-model="state.sort" title="Sort" />
      <HstCheckbox v-model="state.footer" title="Show footer" />
    </template>
    <Variant title="Default" :init-state="initStateDefault">
      <template #default="{ state }">
        <div class="v-story v-story-medium">
          <OuiTable v-model:sort="state.sort" :columns="columns" :data="data" :footer="state.footer">
            <template #col-one="{ value, col }">
              {{ col.name }} {{ value }}
            </template>
            <template #col-action="{ value, col }">
              <VButton size="small" @click="console.log(value, col)">
                Action
              </VButton>
            </template>
            <template #footer-one>
              One foot
            </template>
            <template #header-one>
              ONE
            </template>
          </OuiTable>
        </div>
      </template>
    </Variant>
  </Story>
</template>
