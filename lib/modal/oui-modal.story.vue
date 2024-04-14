<script lang="ts" setup>
import { OuiModal } from '@/lib'

function initialState() {
  return {
    show: false,
  }
}
</script>

<template>
  <Story auto-props-disabled>
    <template #controls="{ state }">
      <HstCheckbox v-model="state.show" title="show" />
    </template>
    <Variant title="useMenu" :init-state="initialState">
      <template #default="{ state }">
        <h1>Oui</h1>
        <p>Just another set of UI components for Vue.js with a proper French-sounding name</p>
        <button @click="state.show = !state.show">
          Click to show modal
        </button>
        <OuiModal v-model="state.show" close>
          <template #header>
            Header
          </template>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam possimus aut omnis perspiciatis consequuntur at accusantium? Voluptas ab ex quo, omnis, quidem, officiis corporis nostrum perspiciatis ea recusandae reprehenderit fugiat!</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam possimus aut omnis perspiciatis consequuntur at accusantium? Voluptas ab ex quo, omnis, quidem, officiis corporis nostrum perspiciatis ea recusandae reprehenderit fugiat!</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam possimus aut omnis perspiciatis consequuntur at accusantium? Voluptas ab ex quo, omnis, quidem, officiis corporis nostrum perspiciatis ea recusandae reprehenderit fugiat!</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam possimus aut omnis perspiciatis consequuntur at accusantium? Voluptas ab ex quo, omnis, quidem, officiis corporis nostrum perspiciatis ea recusandae reprehenderit fugiat!</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam possimus aut omnis perspiciatis consequuntur at accusantium? Voluptas ab ex quo, omnis, quidem, officiis corporis nostrum perspiciatis ea recusandae reprehenderit fugiat!</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam possimus aut omnis perspiciatis consequuntur at accusantium? Voluptas ab ex quo, omnis, quidem, officiis corporis nostrum perspiciatis ea recusandae reprehenderit fugiat!</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam possimus aut omnis perspiciatis consequuntur at accusantium? Voluptas ab ex quo, omnis, quidem, officiis corporis nostrum perspiciatis ea recusandae reprehenderit fugiat!</p>

          <template #footer>
            Footer
          </template>
        </OuiModal>
      </template>
    </Variant>
  </story>
</template>

<docs lang="md">

</docs>
