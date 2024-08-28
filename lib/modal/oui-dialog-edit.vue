<script lang="ts" setup>
import { OuiButton, OuiModal, OuiText, OuiWait } from 'oui-kit'
import { nextTick, ref } from 'vue'

defineProps<{
  title: string
  update?: boolean
  delete?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  save: []
  cancel: []
  delete: []
}>()

const wait = ref(false)

async function doSave() {
  wait.value = true
  await nextTick()
  emit('save')
}

async function doCancel() {
  emit('cancel')
}

async function doDelete() {
  // eslint-disable-next-line no-alert
  if (confirm('Are you shure?') === true)
    emit('delete')
}
</script>

<template>
  <OuiModal :title="title" :allow-cancel="disabled" @close="doCancel">
    <OuiText>
      <slot />
    </OuiText>
    <template #footer>
      <div class="-x -center">
        <div v-if="wait" class="-x wait">
          <OuiWait />
          <div>
            &nbsp;
            Please wait ...
          </div>
        </div>
        <template v-else>
          <slot name="left">
            <OuiButton v-if="update === true && $props.delete !== false" mode="danger" @click="doDelete">
              Delete
            </OuiButton>
          </slot>
        </template>
        <div class="-grow" />
        <OuiButton :disabled="wait" mode="neutral" @click="doCancel">
          Cancel
        </OuiButton>
        <OuiButton :disabled="wait || disabled" mode="primary" @click="doSave">
          <template v-if="update">
            Update
          </template>
          <template v-else>
            Create
          </template>
        </OuiButton>
      </div>
    </template>
  </OuiModal>
</template>
