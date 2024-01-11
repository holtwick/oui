<script lang="ts" setup>
import { useMagicKeys } from '@vueuse/core'
import { computed, ref, useAttrs, watch } from 'vue'
import { vFocustrap } from './oui-focustrap-directive'

defineProps<{
  close?: boolean
  title?: string
  transition?: string
}>()

const emit = defineEmits(['close', 'cancel'])

const _active = defineModel()

const { escape } = useMagicKeys()

watch(escape, (v) => {
  if (v && _active.value)
    doClose()
})

const root = ref()

function doCancel() {
  emit('cancel')
  doClose()
}

function doClose() {
  emit('close', false)
  _active.value = false
  // emit('update:modelValue', false)
  _active.value = false
}

function didOpen() {
  root.value?.querySelector('.focus')?.focus()
  // emit('didOpen')
}

const attrs = useAttrs()
const name = computed(() => String(attrs.class || 'oui-modal').split(/\s+/gim)?.[0])
</script>

<template>
  <Transition
    appear
    :name="transition ?? `${name}-transition`"
    @after-enter="didOpen"
  >
    <div
      v-if="_active"
      ref="root"
      :class="{ [name]: true, _active }"
      :tabindex="-1"
      aria-modal="true"
      role="dialog"
    >
      <div
        class="oui-modal-overlay _modal_overlay"
        aria-label="Close"
        @click="doCancel"
      />
      <div v-focustrap class="oui-modal-container _modal_container">
        <button
          v-if="close"
          tooltip="Close"
          class="oui-modal-close _modal_close"
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
          class="oui-modal-header _modal_header"
        >
          <div v-if="title || $slots.title" class="oui-modal-title title _modal_title">
            <slot name="title">
              {{ title }}
            </slot>
          </div>

          <slot name="header" />
        </header>
        <section class="oui-modal-body body _modal_body">
          <slot />
        </section>
        <footer v-if="$slots.footer" class="oui-modal-footer footer _modal_footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Transition>
</template>
