---
title: Vue Playground
icon: code
category:
  - Markdown
tag:
  - Markdown
  - Playground
---

Let the Markdown file support vue playground in your VuePress site.

<!-- more -->

## Config

::: code-tabs#config

@tab TS

```ts {10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // enable vue playground
        vuePlayground: true,
      },
    },
  }),
});
```

@tab JS

```js {10}
// .vuepress/config.js
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // enable vue playground
        vuePlayground: true,
      },
    },
  }),
};
```

:::

## Usage

To use vue playground, you should use a container named `vue-playground`.

In it, you can use 3 directives:

- `@file FileName` then a code block to add files
- `@import` then a json block to customize "import map"
- `@setting` then a json block to customize settings

You can see the below demos to see more details.

## Demo

::: vue-playground Vue Playground

@file App.vue

```vue
<script setup>
import { ref } from "vue";

const msg = ref("Hello Playground!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
```

:::

:::: details Code

````md
::: vue-playground Vue Playground

@file App.vue

```vue
<script setup>
import { ref } from "vue";

const msg = ref("Hello Playground!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
```

:::
````

::::

::: vue-playground Vue Playground with customized settings and import

@file App.vue

```vue
<script setup>
import { ref } from "vue";
import Comp from "./Comp.vue";

const msg = ref("Hello Playground!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <Comp />
</template>
```

@file Comp.vue

```vue
<script setup>
import { useBattery } from "@vueuse/core";
import { ref } from "vue";

const { charging, level } = useBattery();
</script>

<template>
  <h1>Battery status</h1>
  <p>Charging: {{ charging }}</p>
  <p>Level: {{ level * 100 }}%</p>
</template>
```

@import

```json
{
  "imports": {
    "@vueuse/core": "https://unpkg.com/@vueuse/core/index.mjs",
    "@vueuse/shared": "https://unpkg.com/@vueuse/shared/index.mjs",
    "vue-demi": "https://unpkg.com/vue-demi/lib/index.mjs"
  }
}
```

@setting

```json
{
  "showCompileOutput": true
}
```

:::

:::: details Code

````md
::: vue-playground Vue Playground with customized settings and import

@file App.vue

```vue
<script setup>
import { ref } from "vue";
import Comp from "./Comp.vue";

const msg = ref("Hello Playground!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <Comp />
</template>
```

@file Comp.vue

```vue
<script setup>
import { useBattery } from "@vueuse/core";
import { ref } from "vue";

const { charging, level } = useBattery();
</script>

<template>
  <h1>Battery status</h1>
  <p>Charging: {{ charging }}</p>
  <p>Level: {{ level * 100 }}%</p>
</template>
```

@import

```json
{
  "imports": {
    "@vueuse/core": "https://unpkg.com/@vueuse/core/index.mjs",
    "@vueuse/shared": "https://unpkg.com/@vueuse/shared/index.mjs",
    "vue-demi": "https://unpkg.com/vue-demi/lib/index.mjs"
  }
}
```

@setting

```json
{
  "showCompileOutput": true
}
```

:::
````

::::
