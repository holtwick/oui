<script lang="ts" setup>
import { reactive } from 'vue'
import { createArray, uuid } from 'zeed'
import { OuiVirtualList } from '@/lib'

const state = reactive({
  sort: '',
  footer: true,
  selectable: true,
  selected: undefined,
})

const items = createArray(1000, i => ({ id: uuid() }))
const visibleItems = reactive(items)
</script>

<template>
  <Story auto-props-disabled>
    <template #controls>
      <HstText v-model="state.sort" title="Sort" />
      <HstNumber v-model="state.selected" title="Selected" />
      <HstCheckbox v-model="state.footer" title="Show footer" />
      <HstCheckbox v-model="state.selectable" title="Selectable" />
    </template>
    <Variant title="Default">
      <template #default>
        <h2>Complex example</h2>
        <div>
          <OuiVirtualList
            :data="visibleItems"
            :height="20"
            style="height: 400px"
          >
            <template #default="{ item, index }">
              {{ index }}.
              <tt>{{ item.id }}</tt>
            </template>
          </ouivirtuallist>
        </div>
        <!-- <OuiTable
            v-model="state.selected"
            v-model:sort="state.sort"
            :columns="columns"
            :data="data"
            :footer="state.footer"
            :selectable="state.selectable"
            @context="menu"
          >
            <template #col-one="{ value, col }">
              {{ col.name }} {{ value }}
            </template>
            <template #col-action="{ value, col }">
              <button class="oui-button" size="small" @click="console.log(value, col)">
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

        <h2>Without columns definitions - super simple</h2>
        <div>
          <OuiTable :data="data" />
        </div> -->
      </template>
    </Variant>
  </Story>
</template>
