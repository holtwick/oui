<script lang="ts" setup>
import { ref } from 'vue'
import OuiFormItem from './oui-form-item.vue'

import './oui-stars.styl'

withDefaults(defineProps<{
  id?: string
  title?: string
  description?: string
  required?: boolean
}>(), {
})

const model = defineModel({ required: true, default: 0 })

const hover = ref(0)
</script>

<template>
  <OuiFormItem
    :id="id"
    :title="title"
    :description="description"
    :required="required"
  >
    <div class="oui-stars">
      <template v-for="i in 5" :key="i">
        <div :class="{ _active: model >= i, _hover: hover >= i }" @click="model = i" @mouseover="hover = i">
          <slot name="icon">
            <svg viewBox="0 0 512 512" fill="currentColor">
              <path d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z" />
            </svg>
          </slot>
        </div>
      </template>
    </div>
  </OuiFormItem>
</template>
