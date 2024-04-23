<script lang="ts" setup>
import { useFileDialog } from '@vueuse/core'
import type { LoggerInterface } from 'zeed'
import { Logger, createPromise } from 'zeed'

import './oui-form.styl'

const log: LoggerInterface = Logger('oui-file')

const { files, open, reset, onChange } = useFileDialog({
  accept: 'image/*',
  multiple: false,
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
</script>

<template>
  <div>
    <img v-if="model" :src="model">
    <button @click.prevent="() => open()">
      Choose file...
    </button>
  </div>
</template>
