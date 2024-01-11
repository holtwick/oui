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
