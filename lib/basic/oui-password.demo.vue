<script lang="ts" setup>
import { OuiCheckbox, OuiDemo, OuiInput, OuiPassword } from '@/lib'
import { reactive } from 'vue'

const state = reactive({
  value: 'Secr3!',
  placeholder: 'Enter Password',
  showMeter: true,
  showVisibilty: true,
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
      :show-visibility="state.showVisibilty"
      :required="state.required"
    />
  </div>
  <OuiDemo :state="state">
    <OuiInput v-model="state.value" title="value" />
    <OuiInput v-model="state.placeholder" title="placeholder" />
    <OuiCheckbox v-model="state.showMeter" switch title="showMeter" />
    <OuiCheckbox v-model="state.showVisibilty" switch title="showVisibilty" />
    <OuiCheckbox v-model="state.required" switch title="required" />
  </OuiDemo>
</template>
