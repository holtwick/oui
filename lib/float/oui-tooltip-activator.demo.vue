<script lang="ts" setup>
import { OuiButton, OuiText } from '@/lib'
</script>

<template>
  <OuiText>
    <p>
      Just another set of UI components for <i
        tooltip="A longer tooltip
in multiple lines
Yeah!"
      >Vue.js</i> with a proper French-sounding name
    </p>
    <OuiButton tooltip="Hello, I am a tooltip">
      Tooltip
    </OuiButton>
    <br>

    <p /><p>Also boxes work:</p>
    <div tooltip="Box" style="background-color: yellow;">
      Demo
    </div>

    <p>
      Title vs. Tooltip

      <ol>
        <li>
          <span title="Just title">
            Just title
          </span>
        </li>
        <li>
          <span tooltip="Just tooltip">
            Just tooltip
          </span>
        </li>
        <li>
          <span tooltip="Both tooltip" title="Both title">
            Both
          </span>
        </li>
        <li>
          <span tooltip="Both tooltip" aria-label="Both title">
            Aria Label
          </span>
        </li>
      </ol>
    </p>
  </OuiText>
</template>

<style>
  [tooltip] {
  text-decoration: underline;
  text-decoration-style: dotted;
  }
</style>
