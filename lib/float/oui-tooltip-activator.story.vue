<script lang="ts" setup>
import { OuiTooltipActivator } from './index'

function initialState() {
  return { }
}
</script>

<template>
  <Story auto-props-disabled>
    <template #controls="{ state }">
      <HstCheckbox v-model="state.show" title="show" />
    </template>
    <Variant title="Simple popover" :init-state="initialState">
      <template #default>
        <p>
          Just another set of UI components for <i
            tooltip="A longer tooltip
in multiple lines
Yeah!"
          >Vue.js</i> with a proper French-sounding name
        </p>
        <button tooltip="Hello, I am a tooltip">
          Tooltip
        </button>
        <br>

        <p>Also boxes work:</p>
        <div tooltip="Box" style="background-color: yellow;">
          Demo
        </div>

        <OuiTooltipActivator />
      </template>
    </Variant>
  </story>
</template>

<style>
[tooltip] {
  text-decoration: underline;
  text-decoration-style: dotted;
}
</style>

<docs lang="md">
# Tooltip

Place the following somewhere, best in your `App.vue`, to activate tooltip support:

```vue
<OuiTooltipActivator />
```

Now simply add the `tooltip` attribute whereever you want:

```html
<button tooltip="Hello, I am a tooltip">
```
</docs>
