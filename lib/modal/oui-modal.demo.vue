<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiButton, OuiCheckbox, OuiDemo, OuiInput, OuiModal, OuiSelect, OuiText } from '@/lib'

const state = reactive({
  size: 'normal',
  show: false,
  footer: true,
  noSheet: false,
  close: true,
  title: 'title',
  header: 'header',
})
</script>

<template>
  <OuiButton @click="state.show = !state.show">
    Click to show modal
  </OuiButton>

  <template v-for="i in 100" :key="i">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam possimus aut omnis perspiciatis consequuntur at accusantium? Voluptas ab ex quo, omnis, quidem, officiis corporis nostrum perspiciatis ea recusandae reprehenderit fugiat!</p>
  </template>

  <OuiModal
    v-model="state.show"
    :close="state.close"
    :title="state.title"
    :no-sheet="state.noSheet"
    :size="state.size as any"
  >
    <template v-if="state.header" #header>
      {{ state.header }}
    </template>
    <template #default>
      <OuiText>
        <template v-for="i in 100" :key="i">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam possimus aut omnis perspiciatis consequuntur at accusantium? Voluptas ab ex quo, omnis, quidem, officiis corporis nostrum perspiciatis ea recusandae reprehenderit fugiat!</p>
        </template>
      </OuiText>
    </template>
    <template v-if="state.footer" #footer>
      <OuiButton mode="neutral" @click="state.show = false">
        Cancel
      </OuiButton>
      <OuiButton mode="primary" @click="state.show = false">
        OK
      </OuiButton>
    </template>
  </OuiModal>
  <OuiDemo :state="state">
    <OuiCheckbox v-model="state.show" switch title="show" />
    <OuiCheckbox v-model="state.footer" switch title="footer" />
    <OuiCheckbox v-model="state.noSheet" switch title="noSheet" />
    <OuiCheckbox v-model="state.close" switch title="close" />
    <OuiInput v-model="state.title" title="title" />
    <OuiInput v-model="state.header" title="header" />
    <OuiSelect v-model="state.size" :options="['small', 'normal', 'large']" />
  </OuiDemo>
</template>
