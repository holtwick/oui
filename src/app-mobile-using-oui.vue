<script lang="ts" setup>
import { OuiMobileActivator } from '@/lib'

import './app-mobile-using-oui.styl'
</script>

<template>
  <OuiMobileActivator />
  <div class="app-mobile">
    <header>
      Header
    </header>
    <main data-scroll="true">
      <ol>
        <template v-for="i in 100" :key="i">
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
    </main>
    <footer>
      Footer
    </footer>
  </div>
</template>
