# oui-notice

A prominent overlay containing a message, suitable e. g. for warning messages. It covers everything up to parent element with `position: relative`. If icon is used, it should be an SVG.

```vue
<OuiNotice title="Warning">
  <template #icon><OuiClose></template>
  You should not do that!
</OuiNotice>
```

## Props

- `title?: string`

## Slots

- `#default`
- `#title`
- `#icon`
