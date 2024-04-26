<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'
import { OuiButton, useMenu, useMenuWithValue, vMenu } from '@/lib'

const log: LoggerInterface = Logger('oui-menu.demo')

const simpleMenu = useMenu([
  {
    title: `ABC`,
    action: self => log('action', self),
  },
  {},
  {
    title: `XYZ`,
    action: self => log('action', self),
  },
])

const menu = useMenuWithValue((item: number) => [{
  title: `Hello ${item}`,
  action: () => {
    log('hallo', { item })
  },
}])
</script>

<template>
  <div>
    <h1>v-menu</h1>
    <OuiButton ref="button" v-menu="simpleMenu">
      Click me
    </OuiButton>
    <p>You may click with right or left mouse key.</p>

    <h1>useMenuWithValue</h1>
    <OuiButton ref="button" v-menu="menu(1)">
      Click 1
    </OuiButton>
    <OuiButton ref="button" v-menu="menu(2)">
      Click 2
    </OuiButton>
    <p>You may click with right or left mouse key.</p>
  </div>
</template>
