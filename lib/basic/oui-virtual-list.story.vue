<script lang="ts" setup>
import { useVirtualList } from '@vueuse/core'
import { reactive } from 'vue'
import { createArray, uuid } from 'zeed'

const state = reactive({
  sort: '',
  footer: true,
  selectable: true,
  selected: undefined,
})

const items = createArray(1000, i => ({ id: uuid() }))
const visibleItems = reactive(items)

const { scrollTo, containerProps, wrapperProps, list } = useVirtualList(visibleItems, { itemHeight: 32 })
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
        {{ visibleItems.length }}
        <div>
          <div
            v-bind="containerProps"
            style="max-height: 400px; overflow: scroll; border: 1px solid purple"
          >
            <div v-bind="wrapperProps">
              <div
                v-for="{ index, data: item } in list"
                :key="index"
                :style="{
                  height: `32px`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }"
              >
                <div class="user">
                  {{ item.id }}
                </div>
              </div>
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
          </div>
        </div>
      </template>
    </Variant>
  </Story>
</template>

<style scoped>
.scroller {
  height: 100%;
}

.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>
