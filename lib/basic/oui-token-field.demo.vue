<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@/basic/i18n'
import { OuiTokenField } from '@/lib'

import './oui-token-field.demo.styl'

const availableTokens = ['date', 'time', 'price', 'name', 'id', 'category']

const tokenOptions = {
  date: ['shortDate', 'longDate', 'iso', 'timestamp'],
  time: ['12hour', '24hour', 'timestamp'],
  price: ['currency', 'decimal', 'cents'],
  name: ['first', 'last', 'full', 'initials'],
  id: ['uuid', 'sequential', 'random'],
  category: ['lowercase', 'uppercase', 'titleCase'],
} as any

const basicContent = ref({
  content: [],
})

const prefilledContent = ref({
  content: [
    {
      type: 'text',
      text: 'Invoice-',
    },
    {
      type: 'token',
      name: 'date',
      option: 'shortDate',
    },
    {
      type: 'text',
      text: '-',
    },
    {
      type: 'token',
      name: 'id',
      option: 'sequential',
    },
    {
      type: 'text',
      text: '-',
    },
    {
      type: 'token',
      name: 'price',
    },
    {
      type: 'text',
      text: '.pdf',
    },
  ],
})
</script>

<template>
  <div class="demo-container">
    <h1>{{ t('OuiTokenField Demo', 'demo.tokenField.title') }}</h1>

    <div class="demo-section">
      <h2>{{ t('Basic Usage', 'demo.tokenField.basicUsage') }}</h2>
      <p>{{ t('Click in the field to add text, or press { to add a token', 'demo.tokenField.instructions') }}</p>

      <OuiTokenField v-model="basicContent" :available-tokens="availableTokens" :token-options="tokenOptions" />

      <h3>{{ t('Output JSON:', 'demo.tokenField.outputJson') }}</h3>
      <pre>{{ JSON.stringify(basicContent, null, 2) }}</pre>
    </div>

    <div class="demo-section">
      <h2>{{ t('Pre-filled Example', 'demo.tokenField.prefilledExample') }}</h2>
      <p>{{ t('This shows a filename template with tokens', 'demo.tokenField.filenameTemplate') }}</p>

      <OuiTokenField v-model="prefilledContent as any" :available-tokens="availableTokens" :token-options="tokenOptions" />

      <h3>{{ t('Output JSON:', 'demo.tokenField.outputJson') }}</h3>
      <pre>{{ JSON.stringify(prefilledContent, null, 2) }}</pre>
    </div>

    <div class="demo-section">
      <h2>{{ t('Available Tokens', 'demo.tokenField.availableTokens') }}</h2>
      <ul>
        <li v-for="token in availableTokens" :key="token">
          <strong>{{ token }}</strong>
          <span v-if="tokenOptions[token]">
            - {{ t('Options:', 'demo.tokenField.options') }} {{ tokenOptions[token].join(', ') }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
