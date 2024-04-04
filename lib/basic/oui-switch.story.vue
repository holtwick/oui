<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiSwitch } from '../lib'

const state = reactive({
  value: false,
})
</script>

<template>
  <Story auto-props-disabled>
    <template #controls>
      <HstCheckbox v-model="state.value" title="Show footer" />
    </template>
    <Variant title="Default">
      <template #default>
        <div>
          <label>
            <OuiSwitch
              v-model="state.value"
            />
            Just a switch
          </label>
        </div>
      </template>
    </Variant>
  </Story>
</template>
