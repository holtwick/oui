<script lang="ts" setup>
import { logEvent } from 'histoire/client'

function initStateBigButton() {
  return {
    type: 'default',
    label: 'Click on this button',
    disabled: false,
    size: 'large',
    hasLanguage: false,
    language: 'de',
    hasIcon: false,
    iconType: 'user',
    hasDropdown: false,
  }
}
 
</script>

<template>
  <Story title="atoms/VButton" xauto-props-disabled>
    <!-- <template #controls="{ state }">
      <HstSelect v-model="state.type" title="Type" :options="buttonTypes" />
      <HstText v-model="state.label" title="Label" />
      <HstText v-model="state.href" title="Link" />
      <HstSelect v-model="state.linkTarget" title="Link target" :options="['_blank', '_self']" />
      <HstCheckbox v-model="state.disabled" title="Disabled" />
      <HstSelect v-model="state.size" title="Size" :options="buttonSizes" />
      <HstCheckbox v-model="state.hasLanguage" title="Has language?" />
      <HstSelect v-model="state.language" title="Which language?" :options="['de', 'en']" />
      <HstCheckbox v-model="state.hasIcon" title="Has icon?" />
      <HstSelect v-model="state.iconType" title="Which icon?" :options="iconTypes" />
    </template> -->
    <Variant title="Big Button" :init-state="initStateBigButton">
      <template #default="{ state }">
        Hello World 123 {{state}}
      </template>
    </Variant>
  </Story>
</template>
