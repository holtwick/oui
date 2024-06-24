<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiCheckbox, OuiDemo, OuiInput, OuiSelect } from '../lib'

const state = reactive({
  value: '',
  lazy: true,
  required: false,
  title: 'Title',
  type: 'text',
})
</script>

<template>
  <div>
    <OuiInput
      v-model="state.value"
      :lazy="state.lazy"
      :required="state.required"
      :title="state.title"
      :type="state.type"
    />
  </div>

  <OuiDemo :state="state">
    <OuiInput v-model="state.value" title="value" />
    <OuiInput v-model="state.title" title="title" />
    <OuiCheckbox v-model="state.lazy" switch title="lazy" />
    <OuiCheckbox v-model="state.required" switch title="required" />
    <OuiSelect v-model="state.type" title="type" :options="['text', 'url', 'email', 'tel', 'search']" />
  </ouidemo>
</template>
