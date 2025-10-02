<!-- eslint-disable import/no-duplicates -->
<!-- eslint-disable import/first -->
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Wrapper: () => import('./Wrapper.vue'),
  },
  inheritAttrs: false,
})
</script>

<!-- eslint-disable import/no-duplicates -->
<!-- eslint-disable import/first -->
<script setup lang="ts">
import type { Path } from '../util'
import { computed } from 'vue'
import { cache, useExpand } from '../hooks'

const props = withDefaults(
  defineProps<{
    path: Path
    data: Record<PropertyKey, unknown>
    name: string
    expandOnCreatedAndUpdated: (path: Path) => boolean
    getKeys: (object: Record<PropertyKey, unknown>, path: Path) => string[]
    role: string
    ariaLevel: number
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
    :aria-level="ariaLevel"
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
      <!-- {{ isExpanding ? '' : '{...}' }} -->

    </span>

    <template v-if="isCircular">
      <span v-if="isExpanding" class="value">
        <template v-for="key of keys" :key="key">
          <Wrapper
            class="value"
            :name="key"
            :path="[...path, key]"
            :data="data[key]"
            :expand-signal="innerExpandSignal"
            :collapse-signal="innerCollapseSignal"
            :expand-on-created-and-updated="() => false"
            :get-keys="getKeys"
            :aria-level="ariaLevel"
          />
        </template>
      </span>
    </template>

    <template v-else>
      <span v-show="isExpanding" class="value">
        <template v-for="key of keys" :key="key">
          <Wrapper
            class="value"
            :name="key"
            :path="[...path, key]"
            :data="data[key]"
            :expand-signal="innerExpandSignal"
            :collapse-signal="innerCollapseSignal"
            :expand-on-created-and-updated="expandOnCreatedAndUpdated"
            :get-keys="getKeys"
            :aria-level="ariaLevel"
          />
        </template>
      </span>
    </template>
  </span>
</template>
