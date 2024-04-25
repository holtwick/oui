<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiButton, OuiModal } from '@/lib'

const state = reactive({
  show: false,
})
</script>

<template>
  <OuiButton @click="state.show = !state.show">
    Click to show modal
  </OuiButton>
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
  <OuiDemo :state="state" />
</template>
