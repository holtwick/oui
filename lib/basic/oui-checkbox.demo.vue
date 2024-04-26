<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiCheckbox, OuiDemo } from '../lib'

const state = reactive({
  value: false,
  intermediateValue: null,
})
</script>

<template>
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
  <OuiDemo :state="state" />
</template>
