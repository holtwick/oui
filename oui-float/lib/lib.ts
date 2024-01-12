// import { ref } from 'vue'
// import type { DirectiveBinding } from 'vue'

// /** Vue3 Directive! */
// export const vActionToggle = {
//   mounted: (el: HTMLElement, binding: DirectiveBinding, ...args: any) => {
//     console.log(el, binding, args)
//     // if (binding instanceof ref)
//     //   throw new Error('v-menu requires function as argument')
//     el.addEventListener('contextmenu', (ev: MouseEvent) => {
//       console.log('menu')
//       ev.preventDefault() // no system menu
//       binding.value = !binding.value
//     })

//     el.addEventListener('click', (ev: MouseEvent) => {
//       console.log('click', binding)
//       binding.value = !binding.value
//     })
//   },
// }

// /** Vue3 Directive! */
// export const vActionTrue = {
//   mounted: (el: HTMLElement, binding: DirectiveBinding) => {
//     if (binding instanceof ref)
//       throw new Error('v-menu requires function as argument')
//     el.addEventListener('contextmenu', (ev: MouseEvent) => {
//       ev.preventDefault() // no system menu
//       binding.value = true
//     })

//     el.addEventListener('click', (ev: MouseEvent) => {
//       binding.value = true
//     })
//   },
// }
