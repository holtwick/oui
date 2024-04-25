<script lang="ts" setup>
import { reactive } from 'vue'
import { createArray, uuid } from 'zeed'
import { OuiVirtualList } from '@/lib'

const items = createArray(1000, i => ({ id: uuid() }))
const visibleItems = reactive(items)
</script>

<template>
  <h2>Virtual List</h2>
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
</template>
