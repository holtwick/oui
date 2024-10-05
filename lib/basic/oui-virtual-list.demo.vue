<script lang="ts" setup>
import { OuiVirtualList } from '@/lib'
import { createArray } from 'zeed'
import { useLazyData } from './lazy-data'

// const items = createArray(1000, i => ({ id: uuid() }))
// const visibleItems = reactive(items)

async function onFetch(offset: number, length: number) {
  return createArray(length).map((_, i) => {
    const id = String(offset + i)
    return { id }
  })
}

const { data, setVisible } = useLazyData({
  size: 1000,
  chunkSize: 10,
  margin: 5,
  onFetch,
})
</script>

<template>
  <h2>Virtual List</h2>
  <div>
    <OuiVirtualList
      :data="data as any"
      :height="20"
      style="height: 400px"
      @visible="setVisible"
    >
      <template #default="{ item, index }">
        {{ index }}.
        <tt>{{ item.id }}</tt>
      </template>
    </ouivirtuallist>
  </div>
</template>
