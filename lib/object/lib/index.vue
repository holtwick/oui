<script setup lang="ts">
import type { Path } from './util'
import Wrapper from './wrapper.vue'

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
    getKeys: (object: Record<PropertyKey, unknown> | unknown[]) =>
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
      :level="0"
    />
  </section>
</template>
