# oui-virtual-list

A virtual list component that lazy loads data as the user scrolls. This component is designed to be used with large data sets.

It is used in `oui-tableview` to render the rows of the table.

## Basic usage


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
<OuiVirtualList
  :data="data as any"
  :height="20"
  style="height: 400px"
  @visible="setVisible"
>
  <template #default="{ item, index }">
    {{ index }}.
    <tt>{{ item.id }}</tt>
  </template>
</OuiVirtualList>
```
 