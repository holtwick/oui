<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiPassword } from '../lib'

const state = reactive({
  value: '',
})
</script>

<template>
  <Story auto-props-disabled>
    <template #controls>
      <HstText v-model="state.value" title="Password" />
    </template>
    <Variant title="Default">
      <template #default>
        <div>
          <OuiPassword
            v-model="state.value"
            placeholder="Enter a strong password"
            show-meter
          />
        </div>
      </template>
    </Variant>
  </Story>
</template>
