<script lang="ts" setup>
import { SmilePlus } from 'lucide-vue-next'

import './form.story.styl'
</script>

<template>
  <Story auto-props-disabled>
    <Variant title="Form" :init-state="initialState">
      <template #default>
        <div class="_form oui-form">
          <h1>Form</h1>
          <div class="_form_section">
            Inner
            <input type="text" value="Lorem ipsum semper habeo duo, ut vis. Aliquyam eu splendide. Ut mei eteu nec antiopam corpora. Kasd pretium cetero qui arcu. Assentior ei his usu invidunt kasd justo justo. Semper Ne eleifend Per ut Eam graeci tincidunt. Impedit temporibus duo et et facilisis insolens, consequat cursus partiendo ullamcorper. Vulputate facilisi Donec Aliquam labore inimicus voluptua. Penatibus sea Vel amet. His ius audire In mea Repudiandae nullam sed assentior. Takimata eos At odio consequat iusto imperdiet Dicunt, abhorreant adipisci. Officiis rhoncus leo dicta vitae, clita elementum mauris definiebas. Consetetur te inimicus nec mus. Lorem Usu Duo Aenean corrumpit aliquyam est eum.">
          </div>
          <div class="_form_section _stack_x">
            <input type="text">
            <button>Hello</button>
          </div>
          <div class="_form_section _stack_y">
            <label class="field">
              Label No. 1
              <input type="text" placeholder="This is a placeholder">
            </label>
            <label class="field">
              Label No. 2
              <select />
            </label>
          </div>
          <div class="_form_section">
            <input type="number" min="0" max="120">
          </div>
          <div class="_form_section _stack_x">
            <textarea class="_textarea_grow">Lorem ipsum semper habeo</textarea>
            <input type="text" value="Lorem ipsum semper habeo">
          </div>
          <div class="_form_section">
            <textarea>Lorem ipsum semper habeo duo, ut vis. Aliquyam eu splendide. Ut mei eteu nec antiopam corpora. Kasd pretium cetero qui arcu. Assentior ei his usu invidunt kasd justo justo. Semper Ne eleifend Per ut Eam graeci tincidunt. Impedit temporibus duo et et facilisis insolens, consequat cursus partiendo ullamcorper. Vulputate facilisi Donec Aliquam labore inimicus voluptua. Penatibus sea Vel amet. His ius audire In mea Repudiandae nullam sed assentior. Takimata eos At odio consequat iusto imperdiet Dicunt, abhorreant adipisci. Officiis rhoncus leo dicta vitae, clita elementum mauris definiebas. Consetetur te inimicus nec mus. Lorem Usu Duo Aenean corrumpit aliquyam est eum.</textarea>
          </div>
          <div class="_form_section">
            <input type="text">
          </div>
          <div class="_form_section">
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
          <div class="_form_section">
            <label>
              <input type="checkbox" class="oui-checkbox">
              Not checked
            </label>
          </div>
          <div class="_form_section">
            <label>
              <input type="checkbox" class="oui-checkbox" checked>
              Checked
            </label>
          </div>
          <div class="_form_section">
            <label>
              <input type="checkbox" class="oui-switch">
              Unhappy
            </label>
          </div>
          <div class="_form_section">
            <label>
              <input type="checkbox" class="oui-switch" checked>
              Happy
            </label>
          </div>
          <div class="_form_section">
            <div>
              <label>
                <input type="radio" value="1">
                One
              </label>
            </div>
            <div>
              <label>
                <input type="radio" value="2" checked>
                Two
              </label>
            </div>
            <div>
              <label>
                <input type="radio" value="3">
                Three
              </label>
            </div>
          </div>

          <div class="_form_section _stack_x">
            <button disabled>
              Cancel
            </button>
            <button>OK</button>
            <button><SmilePlus /> Smile</button>
            <button>Smile <SmilePlus /></button>
          </div>
        </div>
      </template>
    </Variant>
  </story>
</template>

<docs lang="md">
# Forms
</docs>
