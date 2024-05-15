# oui-dialog

Programmatically create dialogs. There are two modes:

## Replacing standard dialogs

These dialogs can be used as a replacement for the standard dialogs with the same name. They behave the same, except they have to be called async.

```ts
const { alert, confirm, prompt } = useDialog()

const name = await prompt('Your Name')
```

## Custom dialog

As an argument you pass a Vue component.

```ts
const { open } = useDialog(OuiDialogExample)

const result = await open()
```

The component should be implemented like this:

```ts
const props = defineProps<{
  done?: any
}>()
```

`done` is then called by the component once it is done. Either without an argument or with the expected result. For closing the dialog etc. is taken care automatically.

```ts
done(result)
```

## Tricks

- On opening a dialog you may assign the focus to a secific element by adding the CSS class `_focus` to it.
