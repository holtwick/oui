<script lang="ts" setup>
import { onKeyStroke } from '@vueuse/core'
import { computed, ref, useAttrs } from 'vue'
import { OuiClose } from '../basic'
import { vFocustrap } from './oui-focustrap-directive'

import './css.styl'

defineProps<{
  close?: boolean
  title?: string
  transition?: string
}>()

const emit = defineEmits(['close', 'cancel'])

const _active = defineModel({ default: true })

onKeyStroke('Escape', (e) => {
  if (_active.value) {
    e.preventDefault()
    e.stopPropagation()
    _active.value = false
  }
})

// const { escape } = useMagicKeys()

// watch(escape, (v) => {
//   if (v && _active.value)
//     doClose()
// })

const root = ref()

function doCancel() {
  emit('cancel')
  doClose()
}

function doClose() {
  emit('close', false)
  _active.value = false
  // emit('update:modelValue', false)
}

function didOpen() {
  root.value?.querySelector('.focus')?.focus()
  // emit('didOpen')
}

const attrs = useAttrs()
const name = computed(() => String(attrs.class || 'oui-modal').split(/\s+/gim)?.[0])
</script>

<template>
  <Teleport to="body">
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
              <OuiClose />
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
  </Teleport>
</template>
