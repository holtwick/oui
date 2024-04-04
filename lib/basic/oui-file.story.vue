<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiFile } from '../lib'

const state = reactive({
  value: '',
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
          <OuiFile
            v-model="state.value"
          />
        </div>
      </template>
    </Variant>
  </Story>
</template>
