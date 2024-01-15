<script setup lang="ts">
import { reactive, ref } from 'vue'

import './app-form.styl'
</script>

<template>
  <div class="_form oui-form">
    <h1>Form</h1>
    <div>
      <div>
        Inner
        <input type="text">
      </div>
    </div>
    <div>
      <input type="number" min="0" max="120">
    </div>
    <div>
      <textarea />
    </div>
    <div>
      <input type="text">
    </div>
    <div>
      <select>
        <option value="de">
          Germany
        </option>
        <option value="at">
          Austria
        </option>
        <option value="ch">
          Switzerland
        </option>
      </select>
    </div>

    <div class="form-group">
      <label>
        <input type="checkbox" class="oui-checkbox">
        Checked
      </label>
    </div>
    <div class="form-group">
      <label>
        <input type="checkbox" class="oui-switch">
        Happy
      </label>
    </div>
    <div class="buttons">
      <button disabled>
        Cancel
      </button>
      <button>OK</button>
    </div>
  </div>
</template>
