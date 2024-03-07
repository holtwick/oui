<script lang="ts" setup>
import { logEvent } from 'histoire/client'
import { useMenu, useMenuWithValue, vMenu } from '@/lib'

function initialState() {
  return {
  }
}

const simpleMenu = useMenu([
  {
    title: `ABC`,
    action: self => logEvent('action', self),
  },
  {},
  {
    title: `XYZ`,
    action: self => logEvent('action', self),
  },
])

const menu = useMenuWithValue((item: number) => [{
  title: `Hello ${item}`,
  action: () => {
    logEvent('hallo', { item })
  },
}])
</script>

<template>
  <Story auto-props-disabled>
    <template #controls="{ state }">
      <HstCheckbox v-model="state.show" title="show" />
    </template>
    <Variant title="useMenu" :init-state="initialState">
      <template #default="{ state }">
        <button ref="button" v-menu="simpleMenu">
          Click me
        </button>
        <p>You may click with right or left mouse key.</p>
      </template>
    </Variant>
    <Variant title="useMenuWithValue" :init-state="initialState">
      <template #default="{ state }">
        <button ref="button" v-menu="menu(1)">
          Click 1
        </button>
        <button ref="button" v-menu="menu(2)">
          Click 2
        </button>
        <p>You may click with right or left mouse key.</p>
      </template>
    </Variant>
  </story>
</template>

<docs lang="md">
# useMenu

Dynamic menu generation.

# v-menu

Directive to assign a menu to a HTML element.
</docs>
