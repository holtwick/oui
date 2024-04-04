<script lang="ts" setup>
import { reactive } from 'vue'
import { getTimestamp } from 'zeed'
import { OuiDatetime } from '../lib'

const state = reactive({
  value: getTimestamp(),
})
</script>

<template>
  <Story auto-props-disabled>
    <template #controls>
      <HstText v-model="state.value" title="Data URI" />
    </template>
    <Variant title="Default">
      <template #default>
        <div>
          <OuiDatetime
            v-model="state.value"
          />
        </div>
      </template>
    </Variant>
  </Story>
</template>
