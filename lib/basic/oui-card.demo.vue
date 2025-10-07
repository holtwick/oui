<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiCard } from '@/lib'
import OuiCheckbox from './oui-checkbox.vue'
import OuiInput from './oui-input.vue'

const state = reactive({
  checked: false,
  text: 'Some text',
})
</script>

<template>
  <div class="-y -gap">
    <OuiCard title="Sample Card">
      Hello
    </OuiCard>

    <OuiCard title="Sample Card">
      <OuiInput v-model="state.text" label="Text input" title="Sample" description="Some text" required />
      <OuiCheckbox v-model="state.checked" label="Check me" title="Sample">
        <template #description>
          <em>Some</em> description <a href="#">Link</a>
        </template>
      </OuiCheckbox>
    </OuiCard>
  </div>
</template>
