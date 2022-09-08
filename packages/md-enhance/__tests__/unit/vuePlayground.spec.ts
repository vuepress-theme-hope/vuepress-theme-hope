import { describe, expect, it } from "vitest";
import MarkdownIt from "markdown-it";

import { vuePlayground } from "../../src/node/markdown-it";

describe("Vue Playground", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(vuePlayground);

  it("Should resolve playground info", () => {
    const internalResult = markdownIt.render(
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
      {}
    );

    expect(internalResult).toMatchSnapshot();

    expect(
      markdownIt.render(
        `
::: vue-external-playground Playground demo

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
      )
    ).toMatchSnapshot();
  });

  it("Should resolve playground info with settings", () => {
    expect(
      markdownIt.render(
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
        {}
      )
    ).toMatchSnapshot();

    expect(
      markdownIt.render(
        `
::: vue-external-playground Playground demo2

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
      )
    ).toMatchSnapshot();
  });

  it("Should resolve playground info with settings", () => {
    expect(
      markdownIt.render(
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
        {}
      )
    ).toMatchSnapshot();

    expect(
      markdownIt.render(
        `
::: vue-external-playground Playground demo2

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
      )
    ).toMatchSnapshot();
  });
});
