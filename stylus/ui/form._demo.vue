<script lang="ts" setup>
import { OuiClose } from '@/lib'
</script>

<template>
  <form>
    <h1>Form</h1>

    <div>
      Inner
      <input type="text" value="Lorem ipsum semper habeo duo, ut vis. Aliquyam eu splendide. Ut mei eteu nec antiopam corpora. Kasd pretium cetero qui arcu. Assentior ei his usu invidunt kasd justo justo. Semper Ne eleifend Per ut Eam graeci tincidunt. Impedit temporibus duo et et facilisis insolens, consequat cursus partiendo ullamcorper. Vulputate facilisi Donec Aliquam labore inimicus voluptua. Penatibus sea Vel amet. His ius audire In mea Repudiandae nullam sed assentior. Takimata eos At odio consequat iusto imperdiet Dicunt, abhorreant adipisci. Officiis rhoncus leo dicta vitae, clita elementum mauris definiebas. Consetetur te inimicus nec mus. Lorem Usu Duo Aenean corrumpit aliquyam est eum.">
    </div>

    <section>
      <input type="text">
      <button>Hello</button>
    </section>

    <label>
      Label No. 1
      <input type="text" placeholder="This is a placeholder">
    </label>

    <label>
      Label No. 2
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
    </label>

    <label>
      Label No. 3
      <textarea>ABC</textarea>
    </label>

    <div>
      <input type="number" min="0" max="120">
    </div>

    <section>
      <textarea class="_textarea_grow">Lorem ipsum semper habeo</textarea>
      <input type="text" value="Lorem ipsum semper habeo">
    </section>

    <div>
      <textarea>Lorem ipsum semper habeo duo, ut vis. Aliquyam eu splendide. Ut mei eteu nec antiopam corpora. Kasd pretium cetero qui arcu. Assentior ei his usu invidunt kasd justo justo. Semper Ne eleifend Per ut Eam graeci tincidunt. Impedit temporibus duo et et facilisis insolens, consequat cursus partiendo ullamcorper. Vulputate facilisi Donec Aliquam labore inimicus voluptua. Penatibus sea Vel amet. His ius audire In mea Repudiandae nullam sed assentior. Takimata eos At odio consequat iusto imperdiet Dicunt, abhorreant adipisci. Officiis rhoncus leo dicta vitae, clita elementum mauris definiebas. Consetetur te inimicus nec mus. Lorem Usu Duo Aenean corrumpit aliquyam est eum.</textarea>
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

    <div>
      <label>
        <input type="checkbox" class="oui-checkbox">
        Not checked
      </label>
      <label>
        <input type="checkbox" class="oui-checkbox" checked>
        Checked
      </label>
    </div>

    <div>
      <label>
        <input type="checkbox" class="oui-switch">
        Unhappy
      </label>
      <label>
        <input type="checkbox" class="oui-switch" checked>
        Happy
      </label>
    </div>

    <div>
      <label>
        <input type="radio" value="1">
        One
      </label>
      <label>
        <input type="radio" value="2" checked>
        Two
      </label>
      <label>
        <input type="radio" value="3">
        Three
      </label>
    </div>

    <section>
      <button disabled>
        Cancel
      </button>
      <button>OK</button>
      <button><OuiClose /> Smile</button>
      <button>Smile <OuiClose /></button>
    </section>
  </form>
</template>
