---
title: Playground
icon: code
---

The plugin provides you playground support.

<!-- more -->

## Config

::: code-tabs#config

@tab TS

```ts {8}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // playground config here
      playground: {
        // add presets here
        presets: [
          "ts",
          "vue",
          {
            name: "playground#language",
            openRender: (playgroundData: PlaygroundData) => {
              // xxx
            },
            closeRender: () => {
              // xxx
            },
          },
        ],
        // configure built-in presets (optional)
        config: {
          ts: {
            // xxx
          },
          vue: {
            // xxx
          },
          // ...
        },
      },
    }),
  ],
};
```

@tab JS

```js {8}
// .vuepress/config.js
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // playground config here
      playground: {
        // add presets here
        presets: [
          "ts",
          "vue",
          {
            name: "playground#language",
            openRender: (playgroundData: PlaygroundData) => {
              // xxx
            },
            closeRender: () => {
              // xxx
            },
          },
        ],
        // configure built-in presets (optional)
        config: {
          ts: {
            // xxx
          },
          vue: {
            // xxx
          },
          // ...
        },
      },
    }),
  ],
};
```

:::

## Usage

You should add presets through `playground.presets` in plugin options.

To use playground, you should use a container named `playground#preset`.

In it, you can use:

- `@file FileName` then a code block to add files
- `@import` then a json block to customize "import map"
- `@setting` then a json block to customize settings

You can see the below demos to see more details.

## Available presets

Currently, we support `ts` and `vue` presets, and we are looking forward to more presets comming from PRs.

If you want to add a playground of your own, you can add a preset by you own in [Advanced Section](#advanced), and welcome to open a PR about your fantastic preset.

::: info TS preset

TS preset is using official playground by default, and do not support mutiple ts files, so all you need to do is add one single ts file through `@file xxx.ts` directive (the filename is not important but the `.ts` file extension is).

To use cutomized compilerOptions, you can provide one through `@setting` directive. But attention, official TS playground does not support all options.

Meanwhile, you can customize the default compilerOption through `playground.config.ts`, and you can use another service besides the official playground through `service` option, just in case you want to deploy your own playground site.

:::

::: info Vue Preset

Vue preset is using the official playground by default, and do not support customizing options like [Vue Playground](./vue-playground.md). So if you are heavily relying on interacting vue playground, we suggest you to use [Vue Playground](./vue-playground.md) instead.

But if you only want a few demos instead of bundling a whole vue playground, you can use this preset to create a `<iframe>`.

Only `service`, `dev` and `ssr` option is available in `@setting` directive.

:::

## Demo

### TS

::: playground#ts TS demo 1

@file index.ts

```ts
const msg = "hello world";

const speak = (msg: string) => console.log(msg);

speak(msg);
```

:::

::: playground#ts TS demo 2

@file index.ts

```ts
const msg = "hello world";

const speak = (msg: string) => console.log(msg);

speak(msg);
```

@settings

```json
{
  "target": "es5"
}
```

:::

### Vue

::: playground#vue Vue demo with cutomized imports

@file App.vue

```vue
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
```

@file Comp.vue

```vue
<template>
  <div>Comp</div>
</template>
```

@import

```json
{
  "imports": {
    "vue": "https://sfc.vuejs.org/vue.runtime.esm-browser.js"
  }
}
```

:::

::: playground#vue Vue demo with customized settings

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

@import

```json
{
  "imports": {
    "lodash-es": "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js"
  }
}
```

@setting

```json
{
  "service": "https://vue-sfc-playground.vercel.app/",
  "showOutput": true
}
```

:::

### Advanced

You can provide your own presets.
