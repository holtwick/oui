<script lang="ts" setup>
import { reactive } from 'vue'
import OuiButton from './oui-button.vue'
import { OuiDemo, OuiInput, OuiNotice, OuiText, OuiTextarea } from '@/lib'

const state = reactive({
  title: 'Notice',
  message: 'Lorem, ipsum dolor sit amet consectetur elit.\n\nFacilis ullam quis, nulla adipisci esse voluptate dolor aliquam architecto dignissimos necessitatibus quaerat, excepturi laborum, debitis alias veritatis enim fugiat exercitationem consectetur!',
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  cover: false,
  demoInput: '',
})

function doCover() {
  state.cover = true
  setTimeout(() => state.cover = false, 3000)
}
</script>

<template>
  <OuiNotice :title="state.title" :cover="state.cover">
    <template #icon>
      <div v-html="state.icon" />
    </template>
    <OuiText>
      <p>{{ state.message }}</p>
      <p>
        <OuiInput v-model="state.demoInput" class="_focus" />
      </p>
    </OuiText>
  </OuiNotice>
  <OuiDemo :state="state">
    <OuiInput v-model="state.title" title="Title" />
    <OuiTextarea v-model="state.message" title="Message" />
    <OuiTextarea v-model="state.icon" title="Icon" />
    <OuiButton @click="doCover">
      Cover for 3s
    </OuiButton>
  </OuiDemo>
</template>
