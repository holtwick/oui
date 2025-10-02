<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiCheckbox, OuiDemo } from '../lib'

const state = reactive({
  value: false,
  intermediateValue: null,
  disabled: false,
})
</script>

<template>
  <div>
    <label>
      <OuiCheckbox
        v-model="state.value"
        :disabled="state.disabled"
      />
      Just a switch
    </label>
  </div>
  <div>
    <OuiCheckbox
      v-model="state.value" :disabled="state.disabled" switch
    >
      Switch with label
    </OuiCheckbox>
  </div>
  <div>
    <OuiCheckbox
      v-model="state.value" :disabled="state.disabled" title="Checkbox with label"
    />
  </div>
  <div>
    <OuiCheckbox
      v-model="state.value"
      :disabled="state.disabled"
      title="Checkbox with label and console log on click"
      description="This one has a description"
      @change="() => console.log(`Clicked! ${state.value}`)"
    />
  </div>
  <div>
    <label>
      <input v-model="state.value" type="checkbox" @change="() => console.log(`Clicked! ${state.value}`)"> Regular checkbox bound to same value
    </label>
  </div>
  <div>
    <OuiCheckbox
      v-model="state.intermediateValue"
      :disabled="state.disabled"
      intermediate
      title="Checkbox with intermediate value"
    />
  </div>
  <OuiDemo :state="state">
    <OuiCheckbox v-model="state.disabled" title="Disabled" />
  </OuiDemo>
</template>
