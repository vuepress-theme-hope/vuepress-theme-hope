import { describe, expect, it } from "vitest";
import MarkdownIt from "markdown-it";

import {
  getTSPlaygroundPreset,
  getVuePlaygroundPreset,
  playground,
} from "../../src/node/markdown-it/index.js";

describe("playground", () => {
  describe("basic", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(playground, {
      name: "playground",
      component: "Playground",
      propsGetter: (data) => {
        expect(data).toMatchSnapshot();

        return {};
      },
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

  describe("ts preset", () => {
    const markdownItwithTSPreset = MarkdownIt({ linkify: true }).use(
      playground,
      getTSPlaygroundPreset({})
    );

    it("Should work", () => {
      const result1 = markdownItwithTSPreset.render(`
::: playground#ts TS demo 1

@file index.ts

\`\`\`ts
const msg = "hello world";

const speak = (msg: string) => console.log(msg);

speak(msg);
\`\`\`

:::
`);

      const result2 = markdownItwithTSPreset.render(`
::: playground#ts TS demo 2

@file index.ts

\`\`\`ts
const msg = "hello world";

const speak = (msg: string) => console.log(msg);

speak(msg);
\`\`\`

@setting

\`\`\`json
{
  "target": "es5"
}
\`\`\`

:::
`);

      expect(result1).toMatchSnapshot();
      expect(result2).toMatchSnapshot();
    });
  });

  describe("vue preset", () => {
    const markdownItwithVuePreset = MarkdownIt({ linkify: true }).use(
      playground,
      getVuePlaygroundPreset({})
    );

    it("Should work", () => {
      const result1 = markdownItwithVuePreset.render(`
::: playground#vue Vue demo with customized imports

@file App.vue

\`\`\`vue
<script setup>
import { ref } from "vue";

import Comp from "./Comp.vue";

const msg = ref("Hello World!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <Comp />
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
`);
      const result2 = markdownItwithVuePreset.render(`
::: playground#vue Vue demo with customized settings

@file App.vue

\`\`\`vue
<script setup>
import { ref } from "vue";

const msg = ref("Hello Playground!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
\`\`\`

@setting

\`\`\`json
{
  "dev": true,
  "ssr": true
}
\`\`\`

:::

`);

      expect(result1).toMatchSnapshot();
      expect(result2).toMatchSnapshot();
    });
  });
});
