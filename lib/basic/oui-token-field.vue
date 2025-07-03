<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { t } from '@/basic/i18n'

import './oui-token-field.styl'

interface TextContent {
  type: 'text'
  text: string
}

interface TokenContent {
  type: 'token'
  name: string
  option?: string
}

type ContentItem = TextContent | TokenContent

interface TokenFieldContent {
  content: ContentItem[]
}

interface Props {
  modelValue?: TokenFieldContent
  availableTokens?: string[]
  tokenOptions?: Record<string, string[]>
}

interface Emits {
  (e: 'update:modelValue', value: TokenFieldContent): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({ content: [] }),
  availableTokens: () => [],
  tokenOptions: () => ({}),
})

const emit = defineEmits<Emits>()

const content = ref<ContentItem[]>([...props.modelValue.content])
const editingIndex = ref<number | null>(null)
const newText = ref('')
const showTokenModal = ref(false)
const newToken = ref({ name: '', option: '' })
const hiddenInput = ref<HTMLInputElement>()

const availableOptions = computed(() => {
  return newToken.value.name ? (props.tokenOptions[newToken.value.name] || []) : []
})

function focusInput() {
  nextTick(() => {
    hiddenInput.value?.focus()
  })
}

function startEditingText(index: number) {
  editingIndex.value = index
  nextTick(() => {
    const element = document.querySelector(`.text-segment:nth-child(${index * 2 + 1})`) as HTMLElement
    element?.focus()
  })
}

function handleTextBlur(index: number, event: Event) {
  const target = event.target as HTMLElement
  const newText = target.textContent || ''

  if (newText.trim()) {
    content.value[index] = { type: 'text', text: newText }
  }
  else {
    content.value.splice(index, 1)
  }

  editingIndex.value = null
  updateModelValue()
}

function handleTextKeydown(index: number, event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault()
    const target = event.target as HTMLElement
    target.blur()
  }
  else if (event.key === 'Backspace' && (event.target as HTMLElement).textContent === '') {
    event.preventDefault()
    removeItem(index)
  }
}

function handleInputKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault()
    if (newText.value.trim()) {
      addNewText()
    }
  }
  else if (event.key === '{') {
    event.preventDefault()
    showTokenModal.value = true
  }
}

function addNewText() {
  if (newText.value.trim()) {
    content.value.push({ type: 'text', text: newText.value.trim() })
    newText.value = ''
    updateModelValue()
  }
}

function editToken(index: number) {
  const token = content.value[index] as TokenContent
  newToken.value = { name: token.name, option: token.option || '' }
  showTokenModal.value = true

  // Store the index for editing
  ;(editToken as any).editingIndex = index
}

function createToken() {
  if (!newToken.value.name.trim())
    return

  const token: TokenContent = {
    type: 'token',
    name: newToken.value.name.trim(),
  }

  if (newToken.value.option) {
    token.option = newToken.value.option
  }

  const editingIndex = (createToken as any).editingIndex
  if (typeof editingIndex === 'number') {
    content.value[editingIndex] = token
    delete (createToken as any).editingIndex
  }
  else {
    content.value.push(token)
  }

  closeTokenModal()
  updateModelValue()
}

function closeTokenModal() {
  showTokenModal.value = false
  newToken.value = { name: '', option: '' }
  delete (createToken as any).editingIndex
}

function removeItem(index: number) {
  content.value.splice(index, 1)
  updateModelValue()
}

function updateModelValue() {
  emit('update:modelValue', { content: [...content.value] })
}
</script>

<template>
  <div class="oui-token-field" @click="focusInput">
    <div class="content">
      <template v-for="(item, index) in content" :key="index">
        <span
          v-if="item.type === 'text'"
          class="text-segment"
          :contenteditable="editingIndex === index"
          @blur="handleTextBlur(index, $event)"
          @keydown="handleTextKeydown(index, $event)"
          @click.stop="startEditingText(index)"
        >{{ item.text }}</span>
        <div
          v-else-if="item.type === 'token'"
          class="token"
          @click.stop="editToken(index)"
        >
          <span class="token-name">{{ item.name }}</span>
          <span v-if="item.option" class="token-option">{{ item.option }}</span>
          <button class="token-remove" @click.stop="removeItem(index)">
            ×
          </button>
        </div>
      </template>
      <input
        ref="hiddenInput"
        v-model="newText"
        class="hidden-input"
        @keydown="handleInputKeydown"
        @blur="addNewText"
      >
    </div>

    <!-- Token Creation Modal -->
    <div v-if="showTokenModal" class="token-modal-overlay" @click="closeTokenModal">
      <div class="token-modal" @click.stop>
        <h3>{{ t('Add Token', 'oui.tokenField.addToken') }}</h3>
        <div class="form-group">
          <label>{{ t('Token Name', 'oui.tokenField.tokenName') }}</label>
          <input v-model="newToken.name" @keydown.enter="createToken">
        </div>
        <div v-if="availableOptions.length" class="form-group">
          <label>{{ t('Option', 'oui.tokenField.option') }}</label>
          <select v-model="newToken.option">
            <option value="">
              {{ t('No option', 'oui.tokenField.noOption') }}
            </option>
            <option v-for="option in availableOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="modal-actions">
          <button @click="closeTokenModal">
            {{ t('Cancel', 'oui.tokenField.cancel') }}
          </button>
          <button :disabled="!newToken.name" @click="createToken">
            {{ t('Create', 'oui.tokenField.create') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
