<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiDemo, OuiInput, OuiNotice, OuiPassword, OuiText, OuiTextarea } from '@/lib'
import OuiButton from './oui-button.vue'
import OuiCheckbox from './oui-checkbox.vue'

const state = reactive({
  title: 'Notice',
  message: 'Lorem, ipsum dolor sit amet consectetur elit.\n\nFacilis ullam quis, nulla adipisci esse voluptate dolor aliquam architecto dignissimos necessitatibus quaerat, excepturi laborum, debitis alias veritatis enim fugiat exercitationem consectetur!',
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  cover: false,
  demoInput: '',
  showNotice: true,
  showTitle: true,
  showIcon: true,
  iconColor: 'red',
})
</script>

<template>
  <OuiNotice title="Login">
    <template v-if="state.showNotice" #default>
      <p>Welcome, please authorize.</p>
      <p>
        <OuiInput v-model="state.title" class="_focus" placeholder="User" name="username" />
      </p>
      <p>
        <OuiPassword v-model="state.demoInput" :show-meter="false" placeholder="Password" name="password" />
      </p>
      <p>
        <OuiButton :disabled="false" mode="primary">
          Login
        </OuiButton>
      </p>
    </template>
  </OuiNotice>
</template>
