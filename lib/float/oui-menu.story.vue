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
    <Variant :init-state="initialState">
      <template #default>
        <h1>v-menu</h1>
        <button ref="button" v-menu="simpleMenu">
          Click me
        </button>
        <p>You may click with right or left mouse key.</p>

        <h1>useMenuWithValue</h1>
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
