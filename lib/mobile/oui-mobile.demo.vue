<script lang="ts" setup>
import { useToggle } from '@vueuse/core'
import { watchEffect } from 'vue'
import { OuiCheckbox, OuiText } from '@/lib'

const [active, toggleActive] = useToggle(
  document.documentElement.classList.contains('oui-mobile'),
  {
    truthyValue: true,
    falsyValue: false,
  },
)

// Watch for changes and update the class
watchEffect(() => {
  if (active.value) {
    document.documentElement.classList.add('oui-mobile')
  }
  else {
    document.documentElement.classList.remove('oui-mobile')
  }
})

const notSupported = !document.documentElement.classList.contains('oui-mobile-supported')
</script>

<template>
  <OuiText>
    <h2>OuiMobile</h2>
    <p>
      The <code>OuiMobile</code> component provides a set of fixes and styles for mobile devices, particularly
      addressing issues with virtual keyboards and scrolling on iOS. Our dialogs behave wrong, if this feature is not enabled.
    </p>
    <p v-if="notSupported">
      <b>OuiMobile is not supported on this device, probably because it did not identify as an iOS or Android device.</b>
    </p>
    <p>
      <OuiCheckbox v-model="active" switch :disabled="notSupported">
        OuiMobile running
      </OuiCheckbox>
    </p>
    <p>
      Test is here:
    </p>
    <ul>
      <li>
        <a href="#../lib/modal/oui-modal.demo.vue">Modal and scroll</a>
      </li>
      <li>
        <a href="#../lib/basic/oui-login.demo.vue">Login Demo</a>
      </li>
      <li>
        <a href="#../lib/basic/oui-notice.demo.vue">Notice</a>
      </li>
      <li>
        <a href="#./css-form.demo.vue">CSS Form</a>
      </li>
      <li>
        <a href="#../lib/modal/oui-dialog.demo.vue">Dialogs</a>
      </li>
      <li>
        <a href="#../lib/modal/oui-dialog-edit.demo.vue">Edit dialogs</a>
      </li>
      <li>
        <a href="#../lib/basic/oui-form-item.demo.vue">Form items</a>
      </li>
    </ul>
  </OuiText>
</template>
