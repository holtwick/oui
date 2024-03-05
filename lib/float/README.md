# oui-float

Vue components that float. Based on [floating-ui](https://floating-ui.com/).

> [!NOTE]
> **oui** componentents are *headless* i.e. they do not come with CSS by default. These examples import CSS syles, but you are free to do it from scratch as well.

## Basic popovers

`oui-float` takes care of most things and is the most general solution for having floating elements attached to some other element. Basic example:

```vue
<script>
import { ref } from 'vue'
import { OuiFloat } from 'oui-float'

import 'oui-float/css'

const button = ref()
const show = ref(false)
</script>

<template>
  <button ref="button" @click="show = !show">
    Click me
  </button>
  <oui-float v-model="show" :reference="button">
    This is the popover
  </oui-float>
</template>
```

You can set your own CSS class via `class` attribute, the default it `oui-float`.  The element floating content is wrapped in a structure like this, where the arrow part is only there if `:arrow="true"` is set:

```html
<div class="oui-float _float">
  <div class="_float_arrow"></div>
  <div class="_float_content"><slot /><div>
</div>
```

## Dropdown

Even simple is defining a dropdown where the click area and the floating part can be defined in one step:

```vue
<template>
  <oui-float>
    This floats
    <template #click>
      Click here!
    </template>
  </oui-float>
</template>
```

## Tooltips

As a convenience tooltips can be used without a hassle. Just place the activator somewhere in your project, best in your main `App.vue` like this:

```vue
<oui-tooltip-activator />
```

Then each HTML element with a `tooltip` attribute will show the tooltip on mouse over:

```vue
<p>
Italic text has a <i tooltip="Hey, you found it :)">tooltip</i>.
</p>
```
