<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiObject, OuiResizeable } from '@/lib'

import './app-resizeable.styl'

const state = reactive({
  sort: '',
  footer: true,
  header: true,
  selectable: true,
  selected: undefined,
  fillLast: true,
  scrollToEnd: false,
})
</script>

<template>
  <h2>Resizeable</h2>
  <div class="app-resizeable">
    <OuiResizeable side="bottom" :min-size="200" :max-size="400" :size="200" class="top" name="top">
      Top
    </OuiResizeable>
    <div class="middle _grow">
      <OuiResizeable side="right" :min-size="200" :max-size="400" :size="200" class="left" name="left">
        Left
      </OuiResizeable>
      <div class="center _grow">
        Center
      </div>
      <OuiResizeable side="left" :min-size="200" :max-size="400" :size="200" class="right" name="right">
        Right
      </OuiResizeable>
    </div>
    <OuiResizeable side="top" :min-size="200" :max-size="400" :size="200" class="bottom" name="bottom">
      Bottom
    </OuiResizeable>
  </div>
  <OuiObject :value="state" />
</template>
