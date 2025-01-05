<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { useDropZone, useFileDialog } from '@vueuse/core'
import { ref } from 'vue'
import { createPromise, Logger } from 'zeed'
import { t } from './i18n'
import OuiClose from './oui-close.vue'
import OuiFormItem from './oui-form-item.vue'

import './oui-file.styl'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  title?: string
  titleChoose?: string
  description?: string
  accept?: string
  // multiple?: boolean
  // preview?: boolean
  required?: boolean
  id?: string
}>(), {
  accept: 'image/*',
  multiple: false,
})

// const emit = defineEmits<{
//   delete: []
// }>()

const log: LoggerInterface = Logger('oui-file')

const dropZoneRef = ref<HTMLDivElement>()

// const filename = ref<string>()
// const filesize = ref<string>()
// const filetype = ref<string>()

const model = defineModel<string | undefined>({ required: true })
const modelFilename = defineModel<string | undefined>('filename', { required: false })

async function fileToDataURI(file: File): Promise<string | undefined> {
  const [promise, resolve] = createPromise<string | undefined>()
  const fileReader = new FileReader()
  fileReader.addEventListener('error', resolve)
  fileReader.addEventListener('abort', resolve)
  fileReader.addEventListener('loadend', e => resolve(fileReader.result))
  fileReader.readAsDataURL(file)
  const datauri = await promise
  if (datauri) {
    modelFilename.value = file.name
    // filesize.value = `${(file.size / 1024).toFixed(2)} KB`
    // filetype.value = file.type
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
  <OuiFormItem :id="id" :title="title" :description="description" :required="required">
    <div ref="dropZoneRef" class="oui-file" :class="{ _over: isOverDropZone }" @click.prevent="doSelect">
      <div class="_content">
        <template v-if="!model || model?.length <= 0">
          <slot>{{ titleChoose ?? t('Choose file...', 'oui.file.choose') }}</slot>
        </template>
        <template v-else>
          <slot name="preview" :filename="modelFilename">
            {{ modelFilename ?? t('File available', 'oui.file.placeholder') }}
          </slot>
          <OuiClose @click.stop.prevent="model = undefined" />
        </template>
      </div>
    </div>
  </OuiFormItem>
</template>
