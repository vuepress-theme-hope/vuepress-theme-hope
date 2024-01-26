/* eslint-disable @typescript-eslint/naming-convention */
import MarkdownIt from "markdown-it";
import { describe, expect, it } from "vitest";

import {
  getTSPlaygroundPreset,
  getUnoPlaygroundPreset,
  getVuePlaygroundPreset,
  playground,
} from "../../src/node/markdown-it/playground/index.js";

describe("playground", () => {
  it("Should not throw", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(playground, {
      name: "test",
    });

    const result = markdownIt.render(
      `
::: test demo

@file a.test
\`\`\`test
abc
\`\`\`

@import

\`\`\`json
{
  "imports": {
    "example": "https://example.com"
  }
}
\`\`\`
:::
`,
      {},
    );

    expect(result).toMatchSnapshot();
  });

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
        {},
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
        {},
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
        {},
      );
    });
  });

  describe("ts preset", () => {
    const markdownItWithTSPreset = MarkdownIt({ linkify: true }).use(
      playground,
      getTSPlaygroundPreset({}),
    );

    it("Should work", () => {
      const result1 = markdownItWithTSPreset.render(`
::: playground#ts TS demo 1

@file index.ts

\`\`\`ts
const msg = "hello world";

const speak = (msg: string) => console.info(msg);

speak(msg);
\`\`\`

:::
`);

      const result2 = markdownItWithTSPreset.render(`
::: playground#ts TS demo 2

@file index.ts

\`\`\`ts
const msg = "hello world";

const speak = (msg: string) => console.info(msg);

speak(msg);
\`\`\`

@setting

\`\`\`json
{
  "target": "es5",
  "declaration": true
}
\`\`\`

:::
`);

      expect(result1).toMatchSnapshot();
      expect(result2).toMatchSnapshot();
    });
  });

  describe("vue preset", () => {
    const markdownItWithVuePreset = MarkdownIt({ linkify: true }).use(
      playground,
      getVuePlaygroundPreset({}),
    );

    const getVueFiles = (content: string): Record<string, string> | null => {
      const result = decodeURIComponent(content).match(/link="(.*?)"/);

      if (!result) return null;

      const files = decodeURIComponent(result[1])
        .split("#")[1]
        .replace("__DEV__", "")
        .replace("__SSR__", "");

      return JSON.parse(Buffer.from(files, "base64").toString()) as Record<
        string,
        string
      >;
    };

    it("Should work", () => {
      const result1 = markdownItWithVuePreset.render(`
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

      const result2 = markdownItWithVuePreset.render(`
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

      const result3 = markdownItWithVuePreset.render(`
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


@import

\`\`\`json
{
  "imports": {
    "vue": "https://unpkg.com/vue/dist/vue.runtime.esm-browser.js"
  }
}
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
      expect(result3).toMatchSnapshot();

      expect(result2).contains("__DEV__");
      expect(result2).contains("__SSR__");
      expect(result3).contains("__DEV__");
      expect(result3).contains("__SSR__");

      const files1 = getVueFiles(result1);
      const files2 = getVueFiles(result2);
      const files3 = getVueFiles(result3);

      expect(files1).toEqual({
        "App.vue": `\
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
`,
        "Comp.vue": `\
<template>
  <div>Comp</div>
</template>
`,
        "import-map.json": `\
{
  "imports": {
    "vue": "https://sfc.vuejs.org/vue.runtime.esm-browser.js"
  }
}\
`,
      });

      expect(files2).toEqual({
        "App.vue": `\
<script setup>
import { ref } from "vue";

const msg = ref("Hello Playground!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
`,
        "import-map.json": `\
{
  "imports": {
    "vue": "https://sfc.vuejs.org/vue.runtime.esm-browser.js",
    "vue/server-renderer": "https://sfc.vuejs.org/server-renderer.esm-browser.js"
  }
}\
`,
      });

      expect(files3).toEqual({
        "App.vue": `\
<script setup>
import { ref } from "vue";

const msg = ref("Hello Playground!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
`,
        "import-map.json": `\
{
  "imports": {
    "vue": "https://unpkg.com/vue/dist/vue.runtime.esm-browser.js",
    "vue/server-renderer": "https://sfc.vuejs.org/server-renderer.esm-browser.js"
  }
}\
`,
      });
    });
  });

  describe("unocss preset", () => {
    const markdownItWithUnoPreset = MarkdownIt({ linkify: true }).use(
      playground,
      getUnoPlaygroundPreset({}),
    );

    it("Should work", () => {
      const result1 = markdownItWithUnoPreset.render(`
::: playground#unocss UnoCSS demo 1

@file index.html

\`\`\`html
<div class="text-red">UnoCSS TEST</div>
\`\`\`

:::
`);

      const result2 = markdownItWithUnoPreset.render(`
::: playground#unocss UnoCSS demo 2

@file index.html

\`\`\`html
<div class="text-$fd-color">UnoCSS TEST 2</div>
\`\`\`

@file config.js

\`\`\`js
import {
  defineConfig,
  presetUno,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
  ]
})

\`\`\`

@file custom.css

\`\`\`css
:root {
  --fd-color: red;
}

\`\`\`

:::
`);

      expect(result1).toMatchSnapshot();
      expect(result2).toMatchSnapshot();
    });
  });
});
