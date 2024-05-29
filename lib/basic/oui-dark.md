# oui-dark

For managing the dark and light mode we use the [VueUse implementation](https://vueuse.org/core/useDark/):

```ts
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
```

In your `index.html` you may optionaly add this code to get the effect earlier and avoid background flickering:

```html
<script>
  const theme = localStorage.getItem('vueuse-color-scheme')
  if (theme === 'dark' || (theme !== 'light' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches))
    document.documentElement.classList.add('dark')
</script>

<style>
  .dark {
    background: black;
    color: white;
  }
</style>
```
