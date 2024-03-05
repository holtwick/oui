# oui-object

Show JS objects as Vue view. Great for debugging.

> [!NOTE]
> **oui** componentents are *headless* i.e. they do not come with CSS by default. These examples import CSS syles, but you are free to do it from scratch as well.

This is a fork of [object-visualizer](https://github.com/iendeavor/object-visualizer). Thanks for the great work!

## Usage

```vue
<script lang="ts" setup>
import { OuiObject } from 'oui-object'

import 'oui-object/css'

const sample = {
  a: 'Hello',
  b: 2,
  c: [1, 2, 3],
  d: {
    deeper: true,
  },
}
</script>

<template>
  <OuiObject :value="sample" title="sample" />
</template>
```
