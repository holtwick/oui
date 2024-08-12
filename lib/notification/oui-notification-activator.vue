<script lang="ts" setup>
import { OuiClose } from '../basic'
import { useSingleton } from '../basic/singleton'
import { notifications } from './notification'

import './oui-notification.styl'

const ok = useSingleton('oui-notification')
</script>

<template>
  <template v-if="ok">
    <teleport to="body">
      <div class="oui-notification-container">
        <transition-group name="oui-notification">
          <template v-for="n in notifications" :key="n.id">
            <div
              class="oui-notification"
              :class="{
                _has_action: n?.onCancel == null,
                [`oui-notification-${n?.mode}`]: n?.mode,
              }"
              @click.stop="n?.onCancel == null && n.action()"
            >
              <!-- <div v-if="n.icon" class="oui-notification-icon">
              <slot name="icon" />
              <oui-icon :name="n.icon" />
            </div> -->
              <div class="oui-notification-body">
                <div class="oui-notification-header">
                  <div v-if="n.title" class="oui-notification-title">
                    {{ n.title }}
                  </div>
                  <div class="oui-notification-close">
                    <button @click.stop="n.close?.()">
                      <slot name="close">
                        <OuiClose />
                      </slot>
                    </button>
                  </div>
                </div>
                <div v-if="n.message" class="oui-notification-message">
                  {{ n.message }}
                </div>
                <div v-if="n.onCancel" class="oui-notification-feedback">
                  <button @click="n.close()">
                    {{ n.cancelLabel ?? 'Cancel' }}
                  </button>
                  <button @click="n.action()">
                    {{ n.actionLabel ?? 'OK' }}
                  </button>
                </div>
              </div>
            </div>
          </template>
        </transition-group>
      </div>
    </teleport>
  </template>
</template>
