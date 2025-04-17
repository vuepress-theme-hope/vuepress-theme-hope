---
title: Vue Playground
icon: b:vuejs
---

The plugin provides you vue playground support.

<!-- more -->

::: tip

Since we are providing a runtime compiler, we are introducing the whole `@vue/compiler-sfc` package with typescript support, so the whole Vue Playground chunk is > 4MB. So you should only use this if you are heavily depending on interactive Vue Playground.

You can use [Vue Demo](./demo/vue.md) and [Playground Vue Preset](./playground.md) as an alternative.

:::

<!-- #region settings -->

## Settings

Install `@vue/repl` in your project:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D @vue/repl
```

@tab yarn

```bash
yarn add -D @vue/repl
```

@tab npm

```bash
npm i -D @vue/repl
```

:::

Then enabling via:

<!-- #endregion settings -->

```js {7} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // enable vue playground
      vuePlayground: true,
    }),
  ],
};
```

<!-- #region after -->

## Usage

To use vue playground, you should use a container named `vue-playground`.

In it, you can use 3 directives:

- `@file FileName` then a code block to add files
- `@import` then a json block to customize "import map"
- `@setting` then a json block to customize settings

You can see the below demos to see more details.

You can import and call `defineVuePlaygroundConfig` in [client config file][client-config] to customize `@vue/repl`:

```ts title=".vuepress/client.ts"
import { defineVuePlaygroundConfig } from "vuepress-plugin-md-enhance/client";

defineVuePlaygroundConfig({
  // `@vue/repl` options here
});
```

## Demo

:::: md-demo Simple Vue Playground

::: vue-playground Playground 1

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

::::

:::: md-demo Vue Playground with customized settings and import

::: vue-playground Playground 2

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

::::

[client-config]: https://vuejs.press/guide/configuration.html#client-config-file

<!-- #endregion after -->
