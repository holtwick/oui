<!-- eslint-disable ts/ban-ts-comment -->
<script setup lang="ts">
// @ts-nocheck

import Wrapper from './components/Wrapper.vue'
import type { Path } from './util'

import './index.css'

withDefaults(
  defineProps<{
    data: unknown
    rootName?: string
    expandOnCreatedAndUpdated?: (path: Path) => boolean
    getKeys?: (
      object: Record<PropertyKey, unknown> | unknown[],
      path: Path,
    ) => string[]
  }>(),
  {
    rootName: '',
    expandOnCreatedAndUpdated: () => false,
    getKeys: (object: Record<PropertyKey, unknown> | unknown[], path: Path) =>
      Object.keys(object),
  },
)
</script>

<template>
  <section class="oui-object">
    <Wrapper
      :data="data"
      :name="rootName"
      :expand-on-created-and-updated="expandOnCreatedAndUpdated"
      :get-keys="getKeys"
      :path="[]"
      :aria-level="0"
    />
  </section>
</template>
