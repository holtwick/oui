<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { useDropZone, useFileDialog } from '@vueuse/core'
import { ref } from 'vue'
import { createPromise, Logger } from 'zeed'
import OuiClose from './oui-close.vue'

import './oui-file.styl'
import './oui-form.styl'

const props = withDefaults(defineProps<{
  title?: string
  accept?: string
  // multiple?: boolean
  // preview?: boolean
}>(), {
  accept: 'image/*',
  multiple: false,
})

const emit = defineEmits<{
  delete: []
}>()

const log: LoggerInterface = Logger('oui-file')

const dropZoneRef = ref<HTMLDivElement>()

const filename = ref<string>()
const filesize = ref<string>()
const filetype = ref<string>()

const model = defineModel<string | undefined | null>({ required: true })

async function fileToDataURI(file: File): Promise<string | undefined> {
  const [promise, resolve] = createPromise<string | undefined> ()
  const fileReader = new FileReader()
  fileReader.addEventListener('error', resolve)
  fileReader.addEventListener('abort', resolve)
  fileReader.addEventListener('loadend', e => resolve(fileReader.result))
  fileReader.readAsDataURL(file)
  const datauri = await promise
  if (datauri) {
    filename.value = file.name
    filesize.value = `${(file.size / 1024).toFixed(2)} KB`
    filetype.value = file.type
    // return `${datauri}?type=${encodeURIComponent(file.type)}&name=${encodeURIComponent(file.name)}&size=${file.size}`
  }
  return datauri
}

async function onDrop(files: File[] | null) {
  const file = files?.[0]
  if (file) {
    model.value = await fileToDataURI(file)
  }
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: [props.accept],
  multiple: false, // props.multiple,
  preventDefaultForUnhandled: false,
})

const { files, open, reset, onChange } = useFileDialog({
  accept: props.accept,
  multiple: false, // props.multiple,
})

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
  <div ref="dropZoneRef" class="oui-file" :class="{ _over: isOverDropZone }" @click.prevent="doSelect">
    <div class="_content">
      <template v-if="!model">
        <slot>{{ title ?? 'Choose file...' }}</slot>
      </template>
      <template v-else>
        <slot name="preview" :filename="filename">
          {{ filename ?? 'File' }} <OuiClose @click="model = undefined" />
        </slot>
      </template>
    </div>
  </div>
</template>
