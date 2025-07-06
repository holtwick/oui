<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { reactive } from 'vue'
import { dayFromToday, Logger, uuid } from 'zeed'
import { OuiCombobox } from '@/lib'

const log: LoggerInterface = Logger('oui-combobox.demo')

const fruits = [
  'Apple',
  'Banana',
  'Cherry',
  'Damson',
  'Elderberry',
  'Fig',
  'Guava',
  'Hawthorn',
  'Ilama',
  'Jackfruit',
  'Kumquat',
  'Lemon',
  'Mango',
  'Nectarine',
  'Olive',
  'Papaya',
  'Quince',
  'Raspberry',
  'Strawberry',
  'Tangerine',
  'Ugli',
  'Vanilla',
  'Wolfberry',
  'Xigua',
  'Yew',
  'Ziziphus',
]

let lastUUID = ''

const items = fruits.map(title => ({ id: (lastUUID = uuid()), title }))

const values = reactive<any>({
  amount: 123.45,
  currency: 'EUR',
  combobox: lastUUID,
  day: dayFromToday(),
  calendar: new Date(),
  tags: {},
  selected: 0,
  filter: '',
  completion: [],
  items,
})

// const items = createArray(20, (i) => {
//   const id = uuid()
//   return { id, title:`${i}. ${id}`}
// })

function doAddItem(title: string) {
  const id = uuid()
  log('new', id, title)
  values.items.push({
    id,
    title,
  })
  return id
}
</script>

<template>
  <div class="app-test page-prose">
    <blockquote>
      See also: <a href="./test-ui-menu">Menu</a>,
      <a href="./test-ui-popover">Popover</a>
    </blockquote>

    <p>Filter: {{ values.filter }}</p>

    <!-- <div title="Completion">
      <OuiCompletion
        v-model="values.filter"
        :items="filteredItems"
        class="tw-tag-input"
        placeholder="[Placeholder]"
        :min-size="120"
        @click="values.completion.push($event)"
        @delete-last="values.completion.pop()"
      >
        <template #before>
          {{ values.completion }} [Before]
        </template>
<template #after>
          [After]
        </template>
<template #item="{ item }">
          {{ item.title }}
        </template>
</OuiCompletion>
</div> -->

    <OuiCombobox v-model="values.combobox" title="Combobox - Reference" :items="values.items">
      <template #item="{ item }">
        {{ item.title }}
      </template>
      <template #after>
        <div class="tw-combobox-after-button">
          LINK
        </div>
      </template>
    </OuiCombobox>

    Clearable:

    <OuiCombobox v-model="values.combobox" :items="values.items" clearable :add-item-action="doAddItem" />

    Select:

    <select v-model="values.combobox" class="oui-select">
      <template v-for="item in items" :key="item.id">
        <option :value="item.id">
          {{ item.title }}
        </option>
      </template>
    </select>

    Raw: <code>{{ values.combobox }}</code>
    <!-- <div>
        Example implementations:
        <a
          href="https://buefy.org/documentation/autocomplete#keep-first"
          target="_blank"
          >Buefy</a
        >
      </div> -->

    <div title="Combobox - Percent Formatting">
      <OuiCombobox v-model="values.percent" :items="[5, 7, 16, 19]" :format-value="(v: any) => (v == null ? '' : `${v} %`)" :parse-value="(v: any) => Number.parseInt(v, 10)" />

      Named:

      <OuiCombobox
        v-model="values.percent" :items="[
          { id: 7, title: '7 % - reduced' },
          { id: 19, title: '19 % - full' },
        ]" :format-value="(v: any) => (v == null ? '' : `${v} %`)" :parse-value="(v: any) => Number.parseInt(v, 10)" clearable
      />

      Raw: <code>{{ values.percent }}</code>
    </div>

    <div title="Debug">
      <div style="height: 150vh; background: #eee">
        <pre>{{ values }}</pre>
      </div>
    </div>
  </div>
</template>
