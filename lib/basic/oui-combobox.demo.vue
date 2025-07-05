<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { computed, reactive } from 'vue'
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

// function doAction(ev: any) {
//   alert(ev)
// }

function doMoveSelection(delta: number) {
  values.selected = Math.max(
    0,
    Math.min(items.length - 1, values.selected + delta),
  )
  // doSelect(false)
  // nextTick(() => input.value.select())
}

// Completion

const filteredItems = computed<any[]>(() => {
  const value = values.filter.trim()
  if (!value)
    return items
  log('calc candidates', value)
  const lvalue = value.toLowerCase()
  let exactMatch = false
  // let currentTags = props.modelValue || []
  // @ts-expect-error todo
  const items2: Tags[] = items.filter((item) => {
    // if (!currentTags.includes(item.id)) {
    if (value) {
      const title = item.title.toString().toLowerCase()
      if (item.title === lvalue)
        exactMatch = true

      return title.includes(lvalue)
    }
    return true
    // }
    // return false
  })
  if (value && !exactMatch)
    items2.push({ action: 'create', value })

  return items2
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
    <h1>
      <AppLink test>
        Test Input Completion
      </AppLink>
    </h1>

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

    <div title="Combobox - Amount and Currency">
      <AppInputAmount
        v-model="values.amount" v-model:currency="values.currency" currency-editable :items="[
          { value: 1, currency: 'EUR' },
          { value: 2, currency: 'EUR' },
          { value: 3, currency: 'USD' },
        ]"
      />

      Raw: <code>{{ values.amount }} {{ values.currency }}</code>
    </div>

    <div title="Tags">
      <TwTag-input v-model="values.tags" :items="values.items">
        <template #item="{ item }">
          {{ item.title }}
        </template>
      </TwTag-input>
    </div>

    <!-- <div v-if="0" title="Items">
      <div>
        <TwButton @click="doMoveSelection(-1)">
          Up
        </TwButton>
        <TwButton @click="doMoveSelection(+1)">
          Down
        </TwButton>
        {{ values.selected }}
      </div>
      <TwItems
        v-model="values.selected"
        :items="values.items"
        @click="doAction"
      >
        <template #header>
          HEADER
        </template>
        <template #default="{ item }">
          {{ item.title }}
        </template>
        <template #footer>
          FOOTER
        </template>
      </TwItems>
    </div> -->

    <!-- <template v-if="0">
      <div v-if="0" title="Calendar">
        <TwCalendar v-model="values.calendar" />
      </div>

      <div title="Day">
        <TwDay v-model="values.day" />
      </div>

      <div title="Completion">
        <OuiCompletion
          v-model="values.combobox"
          :min-size="120"
          :items="values.items"
          class="tw-tag-input"
          placeholder="[Placeholder]"
        >
          <template #before>
            [Before]
          </template>
          <template #after>
            [After]
          </template>
          <template #item="{ item }">
            [Item]{{ item.title }}
          </template>
        </OuiCompletion>
      </div>
    </template> -->

    <div title="Debug">
      <div style="height: 150vh; background: #eee">
        <pre>{{ values }}</pre>
      </div>
    </div>
  </div>
</template>
