<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiCheckbox, OuiDemo, OuiInput, OuiPassword } from '@/lib'

const state = reactive({
  value: 'Secr3!',
  placeholder: 'Enter Password',
  showMeter: true,
  required: false,
})
</script>

<template>
  <div>
    <OuiPassword
      v-model="state.value"
      title="Password"
      :placeholder="state.placeholder"
      :show-meter="state.showMeter"
      :required="state.required"
    />
  </div>
  <OuiDemo :state="state">
    <OuiInput v-model="state.value" title="value" />
    <OuiInput v-model="state.placeholder" title="placeholder" />
    <OuiCheckbox v-model="state.showMeter" switch title="showMeter" />
    <OuiCheckbox v-model="state.required" switch title="required" />
  </OuiDemo>
</template>
