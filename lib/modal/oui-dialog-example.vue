<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { sleep } from 'zeed'
import OuiModal from './oui-modal.vue'

const props = defineProps<{
  done?: any
}>()

const wait = ref(false)

async function doConfirm() {
  wait.value = true
  await nextTick()

  // Do something like sending data
  await sleep(2000)

  props.done?.(true)
}

async function doCancel() {
  props.done?.(false)
}
</script>

<template>
  <OuiModal :title="title" @close="doCancel">
    <div>
      Example Dialog Mode
    </div>
    <template #footer>
      <div class="button-group">
        <div v-if="wait" class="wait center">
          <div class="loader" />
          &nbsp;
          Please wait 2 seconds...
        </div>
        <div class="space" />
        <button :disabled="wait" @click="doCancel">
          Cancel
        </button>
        <button :disabled="wait" @click="doConfirm">
          OK
        </button>
      </div>
    </template>
  </OuiModal>
</template>

<style>
/* https://css-loaders.com/spinner/ */
.wait  {
  opacity: 0.8;
}

.loader {
  height: 1rem;
  width: 1rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid var(--fg, black);
  animation:
    l20-1 0.8s infinite linear alternate,
    l20-2 1.6s infinite linear;
}
@keyframes l20-1{
   0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
   12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
   25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
   50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
   100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
}
@keyframes l20-2{
  0%    {transform:scaleY(1)  rotate(0deg)}
  49.99%{transform:scaleY(1)  rotate(135deg)}
  50%   {transform:scaleY(-1) rotate(0deg)}
  100%  {transform:scaleY(-1) rotate(-135deg)}
}
</style>
