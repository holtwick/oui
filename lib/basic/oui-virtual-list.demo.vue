<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { createArray } from 'zeed'
import { OuiDemo, OuiInputNumber, OuiVirtualList } from '@/lib'
import { useLazyData } from './lazy-data'
import OuiCheckbox from './oui-checkbox.vue'

const state = reactive({
  size: 1000,
  scrollToEnd: false,
  height: 20,
})

async function onFetch(offset: number, length: number) {
  const maxLength = Math.min(state.size - offset, length)
  return createArray(maxLength).map((_, i) => {
    const id = String(offset + i)
    return { id }
  })
}

const { data, setVisible, setSize } = useLazyData({
  size: state.size,
  chunkSize: 10,
  margin: 5,
  onFetch,
})

watch(() => state.size, (size) => {
  setSize(size)
})
</script>

<template>
  <h2>Virtual List</h2>
  <div>
    <OuiVirtualList
      :data="data as any"
      :height="state.height"
      style="height: 400px; max-height: 100%; border: 1px solid #ccc"
      :scroll-to-end="state.scrollToEnd"
      @visible="setVisible"
    >
      <template #default="{ item, index }">
        {{ index }}.
        <tt>{{ item.id }}</tt>
      </template>
    </OuiVirtualList>
  </div>
  <OuiDemo :state="state">
    <OuiInputNumber v-model="state.size" title="Size" description="The size of the list" />
    <OuiCheckbox v-model="state.scrollToEnd" title="Scroll to End" description="Scroll to the end of the list" />
  </OuiDemo>
</template>
