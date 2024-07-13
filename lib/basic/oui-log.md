# oui-log

Use `zeed` logging infrastructure to show certain logs in the frontend. Great for development and debugging.

- `log`: `useLog` object
- `show-time`: show time column
- `show-tag`: show tag column

## Basic usage

In the Vue component setup use logging like this

```ts
const log = useLog('test')
log('This is the first entry')
```

Then register this log object with OuiLog

```vue
<OuiLog :log="log" />
```

OuiTableview is used for display, so notes there apply here as well.
