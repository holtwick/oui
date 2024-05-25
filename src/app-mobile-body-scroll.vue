<script lang="ts" setup>
import { OuiButton, OuiMobileActivator, OuiText, useDialog } from '@/lib'

import './app-mobile-body-scroll.styl'

const { prompt } = useDialog()

/* window.addEventListener('wheel', (e) => {
  e.preventDefault()
  e.stopPropagation()
}, {
  passive: false, // make sure, we get those events
  capture: true, // capture them as early as possible
}) */
</script>

<template>
  <OuiMobileActivator />
  <div class="app-mobile">
    <OuiText>
      <h1>Regular web page with body scrolling</h1>
      <p>
        <OuiButton @click="() => prompt('Hello')">
          Open Dialog
        </OuiButton>
      </p>
      <ol>
        <template v-for="i in 10" :key="i">
          <li>
            <input type="text" value="Hallo">
            <!-- <OuiInput v-model="text" title="fasdfd" /> -->
            {{ i }} Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus at voluptatem, optio nihil
            facere dolorum, porro excepturi ducimus cupiditate, odio officiis laboriosam exercitationem tempore voluptas
            repellat corporis ex accusamus iste!
            <select>
              <option value="1">
                1
              </option>
              <option value="2">
                2
              </option>
              <option value="3">
                3
              </option>
            </select>
          </li>
        </template>
      </ol>
      <p>
        <OuiButton @click="() => prompt('Hello')">
          Open Dialog
        </OuiButton>
      </p>
    </OuiText>
  </div>
</template>
