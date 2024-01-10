<script lang="ts" setup>
import { useMagicKeys } from '@vueuse/core'
import { ref, watch } from 'vue'
import { vFocustrap } from './oui-focustrap-directive'

defineProps<{
  close?: boolean
  title?: string
}>()

const emit = defineEmits(['close', 'cancel'])

const open = defineModel()

const { escape } = useMagicKeys()

watch(escape, (v) => {
  if (v && open.value)
    doClose()
})

const root = ref()

function doCancel() {
  emit('cancel')
  doClose()
}

function doClose() {
  emit('close', false)
  open.value = false
  // emit('update:modelValue', false)
  open.value = false
}

function didOpen() {
  root.value?.querySelector('.focus')?.focus()
  // emit('didOpen')
}
</script>

<template>
  <client-only>
    <transition
      appear
      name="tw-modal-animation"
      @after-enter="didOpen"
    >
      <div
        v-if="open"
        ref="root"
        class="tw-modal"
        :class="{ active: open }"
        :tabindex="-1"
        aria-modal="true"
        role="dialog"
      >
        <div
          class="tw-modal-overlay overlay"
          aria-label="Close"
          @click="doCancel"
        />
        <div v-focustrap class="tw-modal-container">
          <button
            v-if="close"
            tooltip="Close"
            class="tw-modal-close"
            @click="doCancel"
          >
            <slot name="close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </slot>
          </button>
          <header
            v-if="title || $slots.title || $slots.header || close === true"
            class="tw-modal-header"
          >
            <div v-if="title || $slots.title" class="tw-modal-title title">
              <slot name="title">
                {{ title }}
              </slot>
            </div>

            <slot name="header" />
          </header>
          <section class="tw-modal-body body">
            <slot />
          </section>
          <footer v-if="$slots.footer" class="tw-modal-footer footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </transition>
  </client-only>
</template>
