# oui-tableview

Tabular representation of data. Very efficient also for large data sets due to oui-virtual-list rendering.

## Features

- Fast
- Supports large data sets
- Sorting
- Selecting
- Column resizing; persistant
- Footer; header
- Scroll to end; start

## Basic usage

Define the structure of the table. Example:

```ts
const columns: OuiTableColumn[] = [
  { title: '#', name: 'id', sortable: false },
  { title: 'One', name: 'one', sortable: true, width: 200 },
  { title: 'Two', name: 'two', sortable: true, footer: 'Two feet' },
  { title: 'Action', name: 'action', align: 'right' },
]
```

Then use the component:

```vue
 <OuiTableview
  :columns="columns"
  :data="data"
/>
```

## Advanced Features

TODO
