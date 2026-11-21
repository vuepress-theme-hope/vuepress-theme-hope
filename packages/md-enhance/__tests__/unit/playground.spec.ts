// oxlint-disable vitest/max-expects
import MarkdownIt from "markdown-it";
import type { CompilerOptions } from "typescript";
import { describe, expect, it } from "vitest";

import {
  getTSPlaygroundPreset,
  getTypescriptPlaygroundHash,
  getUnoPlaygroundPreset,
  getVuePlaygroundPreset,
  playground,
} from "../../src/node/markdown-it/playground/index.js";

const getVueFiles = (content: string): Record<string, string> | null => {
  const result = /link="(?<link>.*?)"/u.exec(decodeURIComponent(content));

  if (!result) return null;

  const files = decodeURIComponent(result[1])
    .split("#")[1]
    .replace("__DEV__", "")
    .replace("__SSR__", "");

  return JSON.parse(Buffer.from(files, "base64").toString()) as Record<string, string>;
};

describe(playground, () => {
  it("should not throw", () => {
    const markdownIt = new MarkdownIt({ linkify: true }).use(playground, {
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
    const markdownIt = new MarkdownIt({ linkify: true }).use(playground, {
      name: "playground",
      component: "Playground",
      propsGetter: (data) =>
        Object.fromEntries(
          Object.entries(data).map(([key, value]) => [key, JSON.stringify(value)]),
        ),
    });

    it("should resolve playground info", () => {
      const result = markdownIt.render(
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

:::
`,
        {},
      );

      expect(result).toMatchSnapshot();
    });

    it("should resolve playground info with imports and settings", () => {
      const result = markdownIt.render(
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

      expect(result).toMatchSnapshot();
    });
  });

  describe("ts preset", () => {
    const markdownItWithTSPreset = new MarkdownIt({ linkify: true }).use(
      playground,
      getTSPlaygroundPreset({}),
    );

    it("should work", () => {
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

      expect(result1).toMatchSnapshot("demo");
      expect(result2).toMatchSnapshot("demo with settings");
    });
  });

  describe(getTypescriptPlaygroundHash, () => {
    // Settings are parsed from JSON, where enum options can be written as names
    const getQuery = (compilerOptions: Record<string, unknown>): string => {
      const [query] = getTypescriptPlaygroundHash(
        "let x = 1",
        compilerOptions as CompilerOptions,
      ).split("#code/");

      return query;
    };

    it("should keep option name for enum options", () => {
      expect(getQuery({ target: "es5" })).toBe("?target=1");
      expect(getQuery({ target: "es3" })).toBe("?target=0");
      expect(getQuery({ module: "nodenext" })).toBe("?module=199");
      expect(getQuery({ jsx: "react-jsx" })).toBe("?jsx=4");
      expect(getQuery({ moduleResolution: "bundler" })).toBe("?moduleResolution=100");
    });

    it("should support numeric enum values", () => {
      expect(getQuery({ target: 1 })).toBe("?target=1");
      expect(getQuery({ target: 0 })).toBe("?target=0");
      expect(getQuery({ moduleResolution: 100 })).toBe("?moduleResolution=100");
    });

    it("should combine enum and boolean options", () => {
      expect(getQuery({ strict: false, module: "nodenext" })).toBe("?strict=false&module=199");
      expect(getQuery({ target: "es5", declaration: true })).toBe("?target=1&declaration=true");
    });

    it("should ignore empty or unsupported options", () => {
      expect(getQuery({})).toBe("");
      expect(getQuery({ target: undefined })).toBe("");
      expect(getQuery({ target: true })).toBe("");
      expect(getQuery({ target: "not-a-target" })).toBe("");
      expect(getQuery({ unknownOption: 1 })).toBe("");
    });
  });

  describe("vue preset", () => {
    const markdownItWithVuePreset = new MarkdownIt({ linkify: true }).use(
      playground,
      getVuePlaygroundPreset({}),
    );

    it("should work", () => {
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

      expect(result1).toMatchSnapshot("demo with customized imports");
      expect(result2).toMatchSnapshot("demo with customized settings");
      expect(result3).toMatchSnapshot("demo with customized settings and imports");

      expect(result2).contains("__DEV__");
      expect(result2).contains("__SSR__");
      expect(result3).contains("__DEV__");
      expect(result3).contains("__SSR__");

      const files1 = getVueFiles(result1);
      const files2 = getVueFiles(result2);
      const files3 = getVueFiles(result3);

      expect(files1).toStrictEqual({
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

      expect(files2).toStrictEqual({
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

      expect(files3).toStrictEqual({
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
    const markdownItWithUnoPreset = new MarkdownIt({ linkify: true }).use(
      playground,
      getUnoPlaygroundPreset({}),
    );

    it("should work", () => {
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

      expect(result1).toMatchSnapshot("single file demo");
      expect(result2).toMatchSnapshot("multi-file demo");
    });
  });
});
