<script lang="ts" setup>
import { OuiCheckbox, OuiDialogEdit, OuiInput, OuiPassword } from '@/lib'
import { computed, reactive } from 'vue'
import { cloneObject, isBoolean, isEmpty, jsonStringifySorted, objectPlain, sleep } from 'zeed'

const props = defineProps<{
  id?: number
  done?: any
}>()

const update = !!props.id

interface Entry {
  title: string
  username: string
  password: string
  active: string
}

const item = reactive<Entry>(props.id
  ? cloneObject({
    title: 'Major',
    username: 'boss',
    password: '123',
    active: true,
  }) as any
  : {
      active: false,
    })

function snapshot() {
  return jsonStringifySorted(objectPlain(item, {
    transformer: v => isBoolean(v) ? +v : undefined,
  }))
}

const reference = snapshot()

async function doSave() {
  // if (update)
  //   await api.updatePerson(item)
  // else
  //   await api.addPerson(item)

  // This takes 1 sec ;)
  await sleep(1e3)

  props.done()
}

const disabled = computed(() => isEmpty(item.title) || snapshot() === reference)
</script>

<template>
  <template v-if="item">
    <OuiDialogEdit
      title="Person"
      :update="update"
      :disabled="disabled"
      @save="doSave"
      @cancel="done"
      @delete="done"
    >
      <!-- <div>ID: {{ id }}</div> -->

      <OuiInput
        v-model="item.title"
        class="_focus"
        title="Title"
        required
      />

      <OuiInput
        v-model="item.username"
        title="Service User Name"
      />

      <OuiPassword
        v-model="item.password"
        title="Service Password"
        placeholder="Bestehendes Passwort wird nicht angezeigt"
      />

      <OuiCheckbox v-model="item.active" switch title="Active" />
    </OuiDialogEdit>
  </template>
</template>
