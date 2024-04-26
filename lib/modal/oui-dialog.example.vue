<script lang="ts" setup>
import { nextTick, reactive, ref } from 'vue'
import { cloneObject, sleep } from 'zeed'
import OuiModal from './oui-modal.vue'
import { OuiButton, OuiInput, OuiSelect, OuiStars, OuiText, OuiWait } from '@/lib'

const props = defineProps<{
  done?: any
}>()

const item = reactive({
  name: '',
  gender: '',
  rating: 0,
})

const wait = ref(false)

async function doConfirm() {
  wait.value = true
  await nextTick()

  // Do something like sending data
  await sleep(1000)

  props.done?.(cloneObject(item))
}

async function doCancel() {
  props.done?.(undefined)
}
</script>

<template>
  <OuiModal title="Example Dialog Mode" @close="doCancel">
    <OuiText>
      <b>Lorem ipsum</b>, dolor sit amet consectetur adipisicing elit. Deserunt delectus illum tenetur sint atque unde, voluptates facere assumenda in repellendus! Cupiditate laborum recusandae facere dicta reiciendis odio enim dolorum illum!
      <OuiInput v-model="item.name" title="Your Name" required />
      <OuiSelect v-model="item.gender" title="Your Gender" :options="['Female', 'Male', 'Other']" />
      <OuiStars v-model="item.rating" title="Did you like Oui so far?" />
    </OuiText>
    <template #footer>
      <div class="_stack_x _center">
        <div v-if="wait" class="_stack_x wait">
          <OuiWait />
          <div>
            &nbsp;
            Please wait one second...
          </div>
        </div>
        <OuiButton v-else mode="danger">
          Delete
        </OuiButton>
        <div class="_space" />
        <OuiButton :disabled="wait" mode="secondary" @click="doCancel">
          Cancel
        </OuiButton>
        <OuiButton :disabled="wait" @click="doConfirm">
          Save
        </OuiButton>
      </div>
    </template>
  </OuiModal>
</template>
