import { describe, expect, it } from "vitest";
import MarkdownIt from "markdown-it";

import { playground } from "../../src/node/markdown-it/index.js";

describe("playground", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(playground, {
    name: "playground",
    openRender: (data) => {
      expect(data).toMatchSnapshot();

      return "";
    },
    closeRender: () => "",
  });

  it("Should resolve playground info", () => {
    markdownIt.render(
      `
::: playground Playground demo

@file App.vue
\`\`\`vue
<script setup>
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
\`\`\`

@file Comp.vue

\`\`\`vue
<template>
  <div>Comp</div>
</template>
\`\`\`

@import

\`\`\`json
{
  "imports": {
    "vue": "https://sfc.vuejs.org/vue.runtime.esm-browser.js"
  }
}
\`\`\`
:::
`,
      {}
    );
  });

  it("Should resolve playground info with settings", () => {
    markdownIt.render(
      `
::: playground Playground demo2

@file App.vue

\`\`\`vue
<script setup>
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
\`\`\`

@file Comp.vue

\`\`\`vue
<template>
  <div>Comp</div>
</template>
\`\`\`

@setting

\`\`\`json
{
  "service": "https://element-plus.run/"
}
\`\`\`

:::
`,
      {}
    );
  });

  it("Should resolve playground info with settings", () => {
    markdownIt.render(
      `
::: playground Playground demo2

@file App.vue

\`\`\`vue
<script setup>
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
\`\`\`

@import

\`\`\`json
{
  "imports": {
    "vue": "https://sfc.vuejs.org/vue.runtime.esm-browser.js"
  }
}
\`\`\`

@setting

\`\`\`json
{
  "service": "https://element-plus.run/"
}
\`\`\`

:::
`,
      {}
    );
  });
});
