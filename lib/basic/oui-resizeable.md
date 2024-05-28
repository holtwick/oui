# oui-resizeable

Allow resizing two neighbouring boxes.

- `name`: will save the value in `localStorage`
- `side`: define the releative position of the neighbour
- `min-size`
- `max-size`
- `size`
- `#default`: the content

## Basic usage

Then use the component:

```vue
<div class="center _grow">
  Left
</div>

<OuiResizeable
  side="left"
  name="right"
  :size="300"
  :min-size="200"
  :max-size="400"
>
  Right
</OuiResizeable>
```
