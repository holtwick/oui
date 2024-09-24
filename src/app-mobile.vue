<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { useEventListener } from '@vueuse/core'
import { onMounted, reactive } from 'vue'
import { Logger } from 'zeed'

import './app-mobile.styl'

const log: LoggerInterface = Logger('app-mobile')

const info = reactive<any>({})

if (window.visualViewport != null) {
  let prevVisibleHeight = ''
  function resizeHandler() {
    info.height = window.visualViewport?.height
    info.top = window.visualViewport?.offsetTop

    const visibleHeight = `${window.visualViewport?.height.toString()}px`
    // const visibleOffsetTop = `${window.visualViewport?.offsetTop.toString()}px`

    // Adjust the height!
    document.documentElement.style.height = visibleHeight

    if (prevVisibleHeight !== visibleHeight) {
      if (document.activeElement?.matches('input,textarea,[contenteditable]')) {
        document.documentElement.classList.add('virtual-keyboard')

        setTimeout(() => {
          const el = document.activeElement
          if (el?.matches('input,textarea,[contenteditable]')) {
            info.focus = el?.outerHTML.slice(0, 20)
            el?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'center',
            })
          }
        },
        // 400ms takes the virtual keyboard to show up;
        // other values seem to have an negative effect on the layout
        400,
        )
      }
      else {
        document.documentElement.classList.remove('virtual-keyboard')
      }
    }

    prevVisibleHeight = visibleHeight

    log('new height', visibleHeight, window.visualViewport)
    // rootCss.setProperty('--visible-height', visibleHeight)
    // rootCss.setProperty('--visible-offset-top', visibleOffsetTop)
    // window.scrollTo(0, 0)
  }

  useEventListener(window.visualViewport, 'resize', resizeHandler)
  useEventListener(window.visualViewport, 'scroll', resizeHandler)

  // Intercept `touchmove` where no scrolling is planned in our UI
  useEventListener(window, 'touchmove', (ev) => {
    let el = ev.target as HTMLElement | undefined | null
    info.move = el?.outerHTML.slice(0, 20)

    while (el != null) {
      // log('el', el.dataset.scroll)
      // const scroll = el.dataset.scroll
      // if (scroll === 'true')
      //   return

      const { overflow } = window.getComputedStyle(el)
      if (overflow.split(' ').some(o => o === 'auto' || o === 'scroll'))
        return

      el = el.parentElement
    }

    ev.preventDefault()
    ev.stopPropagation()
  }, {
    passive: false, // make sure, we get those events
    capture: true, // capture them as early as possible
  })

  onMounted(resizeHandler)
}
</script>

<template>
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
