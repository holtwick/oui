<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { sortedOrderby } from 'zeed'
import type { OuiTableColumn } from '../lib'
import { OuiTable } from '../lib'

const state = reactive({
  sort: '',
  footer: true,
})

const columns: OuiTableColumn[] = [
  { title: '#', name: 'id', sortable: false },
  { title: 'One', name: 'one', sortable: true },
  { title: 'Two', name: 'two', sortable: true, footer: 'Two feet' },
  { title: '', name: 'action', align: 'right' },
]

const _data = [
  { id: 1, one: 1, two: 2 },
  { id: 2, one: 11, two: 22 },
  { id: 3, one: 111 }, // missing one
]

const data = computed(() => sortedOrderby(_data, state.sort))
</script>

<template>
  <Story auto-props-disabled>
    <template #controls>
      <HstText v-model="state.sort" title="Sort" />
      <HstCheckbox v-model="state.footer" title="Show footer" />
    </template>
    <Variant title="Default">
      <template #default>
        <div>
          <OuiTable v-model:sort="state.sort" :columns="columns" :data="data" :footer="state.footer">
            <template #col-one="{ value, col }">
              {{ col.name }} {{ value }}
            </template>
            <template #col-action="{ value, col }">
              <button size="small" @click="console.log(value, col)">
                Action
              </button>
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
