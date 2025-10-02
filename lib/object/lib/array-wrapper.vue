<script setup lang="ts">
import type { Path } from './util'
import { computed } from 'vue'
import { cache, useExpand } from './hooks'
import { objectToString } from './util'
import Wrapper from './wrapper.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    path: Path
    data: unknown[]
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

const keys = computed(() => props.getKeys(props.data, props.path))

function lookup(key: PropertyKey): unknown {
  return props.data[key as keyof typeof props.data]
}

const isCircular = cache.has(props.data)
cache.add(props.data)

const isCompact = computed(() => props.data.length > 0 && props.data.every(obj => Object(obj) !== obj /* isPrimitive */) && props.data.length <= 8)
</script>

<template>
  <span
    class="array"
    :role="role"
    :aria-expanded="isExpanding"
    :level="level"
    @click.self="handleClick"
  >
    <span class="indicator" @click="handleClick">{{
      keys.length <= 0 || isCompact ? '\xa0' : isExpanding ? '\u25BC' : '\u25B6'
    }}</span>
    <span class="key" @click="handleClick">{{ name === '' ? '' : name }}</span>
    <span class="separator" @click="handleClick">
      {{ name === '' ? '' : ': ' }}
    </span>
    <span v-if="isCompact" class="preview">
      [
      <template v-for="(value, i) in data" :key="i">
        <template v-if="i > 0">, </template>
        <span :class="objectToString(value).toLowerCase()"><span class="value">{{ value === undefined ? 'undefined' : JSON.stringify(value) }}</span></span>
      </template>
      ]
      <span class="count">({{ data.length }})</span>
    </span>
    <template v-else>
      <span class="preview" @click="handleClick">
        <template v-if="keys.length <= 0">[]</template>
        <template v-else-if="!isExpanding">
          [...] <span class="count">({{ data.length }})</span>
        </template>
      </span>

      <span v-if="isExpanding" class="value">
        <template v-for="key of keys" :key="key">
          <Wrapper
            :name="key"
            :path="[...path, key]"
            :data="lookup(key)"
            :expand-signal="innerExpandSignal"
            :collapse-signal="innerCollapseSignal"
            :expand-on-created-and-updated="isCircular ? () => false : expandOnCreatedAndUpdated"
            :get-keys="getKeys"
            :level="level"
          />
        </template>
      </span>
    </template>
  </span>
</template>
