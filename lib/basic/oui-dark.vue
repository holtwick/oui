<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'

// TODO

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button class="oui-dark" @click="toggleDark()">
    toggleDark {{ isDark }}
  </button>
</template>
