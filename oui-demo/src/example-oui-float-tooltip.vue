<script lang="ts" setup>
import { OuiTooltipActivator } from 'oui-float'

import 'oui-float/css'
</script>

<template>
  <p>
    Italic text has a <i tooltip="Hey, you found it :)">tooltip</i>.
  </p>
  <OuiTooltipActivator />
</template>
