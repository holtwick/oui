<script lang="ts" setup generic="K extends string">
import { computed } from 'vue'
import type { OuiTab } from './_types'

import './oui-tabs.styl'

const props = defineProps<{
  tabs: OuiTab<K>[]
  className?: string
}>()

const modelValue = defineModel<K>({ required: false })

const name = computed<string>(() => modelValue.value ?? props.tabs?.[0]?.name ?? 'default')
</script>

<template>
  <div class="oui-tabs">
    <nav class="oui-tabs-nav _nav">
      <template v-for="tab in tabs" :key="tab.name">
        <button
          :class="{ _active: modelValue === tab.name }"
          @click="modelValue = tab.name"
        >
          <template v-if="tab.icon">
            <component :is="tab.icon" />
          </template>
          {{ tab.title ?? tab.name }}
        </button>
      </template>
      <div class="ogrow" />
    </nav>

    <div>
      <slot :key="name" :name="name">
        <slot />
      </slot>
    </div>
  </div>
</template>
