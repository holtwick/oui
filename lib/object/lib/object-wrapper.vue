<script setup lang="ts">
import type { Path } from './util'
import { computed } from 'vue'
import { cache, useExpand } from './hooks'
import Wrapper from './wrapper.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    path: Path
    data: Record<PropertyKey, unknown>
    name: string
    expandOnCreatedAndUpdated: (path: Path) => boolean
    getKeys: (object: Record<PropertyKey, unknown> | unknown[], path: Path) => string[]
    role?: string
    level: number
    collapseSignal?: boolean
    expandSignal?: boolean
  }>(),
  {
    collapseSignal: false,
    expandSignal: false,
  },
)

const { isExpanding, innerExpandSignal, innerCollapseSignal, handleClick } = useExpand(props)

const keys = computed(() => {
  const strings = [...props.getKeys(props.data, props.path)]
  strings.sort()
  return strings
})

const isCircular = cache.has(props.data)
cache.add(props.data)
</script>

<template>
  <span
    class="object"
    :role="role"
    :aria-expanded="isExpanding"
    :aria-level="level"
    @click.self="handleClick"
  >
    <span class="indicator" @click="handleClick">{{
      keys.length <= 0 ? '\xa0' : isExpanding ? '\u25BC' : '\u25B6'
    }}</span>
    <span class="key" @click="handleClick">{{ name === '' ? '' : name }}</span>
    <span class="separator" @click="handleClick">
      {{ name === '' ? '' : ': ' }}
    </span>
    <span class="preview" @click="handleClick">
      <template v-if="keys.length <= 0">{}</template>
      <template v-else>
        {{ isExpanding ? '' : `{ ${keys.join(', ')} }` }}
        <span v-if="!isExpanding" class="count">({{ keys.length }})</span>
      </template>
    </span>

    <span v-if="isExpanding" class="value">
      <template v-for="key of keys" :key="key">
        <Wrapper
          class="value"
          :name="key"
          :path="[...path, key]"
          :data="data[key]"
          :expand-signal="innerExpandSignal"
          :collapse-signal="innerCollapseSignal"
          :expand-on-created-and-updated="isCircular ? () => false : expandOnCreatedAndUpdated"
          :get-keys="getKeys"
          :level="level"
        />
      </template>
    </span>
  </span>
</template>
