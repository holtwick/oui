<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiCheckbox } from '../lib'

const state = reactive({
  value: false,
  intermediateValue: null,
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
            <OuiCheckbox
              v-model="state.value"
            />
            Just a switch
          </label>
        </div>
        <div>
          <OuiCheckbox v-model="state.value" switch>
            Switch with label
          </OuiCheckbox>
        </div>
        <div>
          <OuiCheckbox v-model="state.value" title="Checkbox with label" />
        </div>
        <div>
          <OuiCheckbox
            v-model="state.intermediateValue"
            intermediate
            title="Checkbox with intermediate value"
          />
        </div>
      </template>
    </Variant>
  </Story>
</template>
