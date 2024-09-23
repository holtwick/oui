<script lang="ts" setup>
import { computed } from 'vue'
import { useQRCode } from './qrcode'

const props = defineProps<{
  content: string
}>()

const qrcode = useQRCode()

const qrcodeHTML = computed(() => {
  const typeNumber = 0
  const errorCorrectionLevel = 'M'
  const qr = qrcode(typeNumber, errorCorrectionLevel) as any

  qr.addData(props.content ?? '')
  qr.make()
  return qr.createSvgTag({
    scalable: true,
  })
})
</script>

<template>
  <div class="oui-qrcode" v-html="qrcodeHTML" />
</template>
