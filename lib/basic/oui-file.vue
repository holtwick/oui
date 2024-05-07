<script lang="ts" setup>
import { useFileDialog } from '@vueuse/core'
import type { LoggerInterface } from 'zeed'
import { Logger, createPromise } from 'zeed'

import './oui-form.styl'
import './oui-file.styl'

const props = withDefaults(defineProps<{
  title?: string
  accept?: string
  multiple?: boolean
  preview?: boolean
}>(), {
  accept: 'image/*',
  multiple: false,
})

const emit = defineEmits<{
  delete: []
}>()

const log: LoggerInterface = Logger('oui-file')

const { files, open, reset, onChange } = useFileDialog({
  accept: props.accept,
  multiple: props.multiple,
})

const model = defineModel<string | undefined | null>({ required: true })

async function fileToDataURI(file: File): Promise<string | undefined> {
  const [promise, resolve] = createPromise<string | undefined> ()
  const fileReader = new FileReader()
  fileReader.addEventListener('error', resolve)
  fileReader.addEventListener('abort', resolve)
  fileReader.addEventListener('loadend', e => resolve(fileReader.result))
  fileReader.readAsDataURL(file)
  return promise
}

onChange(async () => {
  const file = files.value?.[0]
  if (file) {
    const url = await fileToDataURI(file)
    log('url', url)
    model.value = url
    reset()
  }
})

function doSelect() {
  log('select')
  open()
}
</script>

<template>
  <div class="oui-file">
    <img v-if="model" :src="model">
    <button class="oui-file-button" @click.prevent="doSelect">
      <slot>{{ title ?? 'Choose file...' }}</slot>
    </button>
  </div>
</template>
