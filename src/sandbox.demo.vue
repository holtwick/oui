<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'
import { reactive } from 'vue'
import { OuiButton, OuiCheckbox, OuiDemo, OuiInput, OuiModal, OuiSelect, OuiText } from '@/lib'
import './sandbox.demo.styl'

const state = reactive({
  show: false,
})
</script>

<template>
  <div class="sandbox">
    <Teleport to="body">
      <Transition
        appear
        name="sandbox-animation"
      >
        <div v-if="state.show" class="sandbox-object">
          <b>OBJECT</b>
        </div>
      </Transition>
    </Teleport>
  </div>
  <OuiDemo :state="state">
    <OuiCheckbox v-model="state.show" switch title="show" />
  </OuiDemo>
</template>
