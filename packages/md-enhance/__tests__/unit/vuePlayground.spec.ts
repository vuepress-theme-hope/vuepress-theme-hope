import MarkdownIt from "markdown-it";
import { describe, expect, it } from "vitest";

import { vuePlayground } from "../../src/node/markdown-it/vuePlayground.js";

const decodeFiles = (content: string): Record<string, string> =>
  JSON.parse(Buffer.from(decodeURIComponent(content), "base64").toString()) as Record<
    string,
    string
  >;

const getFiles = (renderResult: string): Record<string, string> | null => {
  const result = /files="(?<encoded>.*?)"/su.exec(renderResult);

  if (!result) return null;

  return decodeFiles(result[1]);
};

const getSettings = (renderResult: string): Record<string, unknown> | null => {
  const result = /settings="(?<encoded>.*?)"/su.exec(renderResult);

  if (!result) return null;

  return JSON.parse(decodeURIComponent(result[1])) as Record<string, unknown>;
};

describe("vue Playground", () => {
  const markdownIt = new MarkdownIt({ linkify: true }).use(vuePlayground);

  it("should resolve playground info", () => {
    const result = markdownIt.render(
      `
::: vue-playground Playground demo

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

    expect(result).toMatchSnapshot();

    const files = getFiles(result);
    const settings = getSettings(result);

    expect(files).toStrictEqual({
      "App.vue": `\
<script setup>
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
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
}
`,
    });
    expect(settings).toStrictEqual({});
  });

  it("should resolve playground info with settings", () => {
    const result = markdownIt.render(
      `
::: vue-playground Playground demo2

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

    expect(result).toMatchSnapshot();

    const file = getFiles(result);
    const settings = getSettings(result);

    expect(file).toStrictEqual({
      "App.vue": `\
<script setup>
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
`,
      "Comp.vue": `\
<template>
  <div>Comp</div>
</template>
`,
    });
    expect(settings).toStrictEqual({
      service: "https://element-plus.run/",
    });
  });

  it("should work with customize vue import", () => {
    const result = markdownIt.render(
      `
::: vue-playground Playground demo2

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

    const file = getFiles(result);
    const settings = getSettings(result);

    expect(file).toStrictEqual({
      "App.vue": `\
<script setup>
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
`,
      "import-map.json": `\
{
  "imports": {
    "vue": "https://sfc.vuejs.org/vue.runtime.esm-browser.js"
  }
}
`,
    });
    expect(settings).toStrictEqual({
      service: "https://element-plus.run/",
    });
  });
});
