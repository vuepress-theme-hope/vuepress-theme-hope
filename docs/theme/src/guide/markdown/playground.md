---
title: Playground
icon: code
category:
  - Markdown
tag:
  - Markdown
  - Playground
---

Let the Markdown file support playground in your VuePress site.

<!-- more -->

## Config

::: code-tabs#config

@tab TS

```ts {8-33}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // playground config here
        playground: {
          // add presets here
          presets: [
            "ts",
            "vue",
            {
              name: "playground#language",
              component: "PlaygroundComponent",
              propsGetter: (
                playgroundData: PlaygroundData
              ): Record<string, string> => ({
                // playground props
              }),
            },
          ],
          // configure built-in presets (optional)
          config: {
            ts: {
              // ...
            },
            vue: {
              // ...
            },
          },
        },
      },
    },
  }),
});
```

@tab JS

```js {8-33}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // playground config here
        playground: {
          // add presets here
          presets: [
            "ts",
            "vue",
            {
              name: "playground#language",
              component: "PlaygroundComponent",
              propsGetter: (
                playgroundData: PlaygroundData
              ): Record<string, string> => ({
                // playground props
              }),
            },
          ],
          // configure built-in presets (optional)
          config: {
            ts: {
              // ...
            },
            vue: {
              // ...
            },
          },
        },
      },
    },
  }),
};
```

:::

## Usage

You should add presets through `playground.presets` in `plugins.mdEnhance`.

To use playground, you should use a container named `playground#preset`.

In it, you can use 3 directives:

- `@file fileName` then a code block to add files
- `@import importMapFileName` then a json block to customize "import map"
- `@setting` then a json block to customize settings

You can see the below demos to see more details.

## Available presets

Currently, we support `ts` and `vue` presets, and we are looking forward to more presets coming from PRs.

If you want to add a playground of your own, you can add a preset by you own in [Advanced Section](#advanced), and welcome to open a PR about your fantastic preset.

::: info TS preset

TS preset is using official playground by default, and do not support multiple ts files, so all you need to do is add one single ts file through `@file xxx.ts` directive (the filename is not important but the `.ts` file extension is).

To use customized compilerOptions, you can provide one through `@setting` directive. But attention, official TS playground does not support all compiler options.

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

:::: details Code

````md
::: playground#ts TS demo 1

@file index.ts

```ts
const msg = "hello world";

const speak = (msg: string) => console.log(msg);

speak(msg);
```

:::
````

::::

::: playground#ts TS demo 2

@file index.ts

```ts
const msg = "hello world";

const speak = (msg: string) => console.log(msg);

speak(msg);
```

@setting

```json
{
  "target": "es5"
}
```

:::

:::: details Code

````md
::: playground#ts TS demo 2

@file index.ts

```ts
const msg = "hello world";

const speak = (msg: string) => console.log(msg);

speak(msg);
```

@setting

```json
{
  "target": "es5"
}
```

:::
````

::::

### Vue

::: playground#vue Vue demo with customized imports

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

:::: details Code

````md
::: playground#vue Vue demo with customized imports

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
````

::::

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

@setting

```json
{
  "dev": true,
  "ssr": true
}
```

:::

:::: details Code

````md
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

@setting

```json
{
  "dev": true,
  "ssr": true
}
```

:::
````

::::

## Advanced

You can provide your own presets.

```ts
interface PlaygroundCodeConfig {
  /**
   * Code block extension
   *
   * @description It's based on filename, not code fence language
   */
  ext: string;

  /**
   * Code block content
   */
  content: string;
}

interface PlaygroundData {
  /**
   * Title of Playground
   */
  title?: string;

  /**
   * Import map file name
   *
   * @default 'import-map.json'
   */
  importMap?: string;

  /**
   * Playground files info
   */
  files: Record<
    /** File name */
    string,
    /** File detail */
    PlaygroundCodeConfig
  >;

  /**
   * Playground settings
   *
   * @description It's parsed result of json content after setting directive
   */
  settings: Record<string, unknown>;

  /**
   * hash key based on playground content
   */
  key: string;
}

interface PlaygroundOptions {
  /**
   * Playground container name
   */
  name: string;

  /**
   * Playground component name
   *
   * @default 'Playground'
   */
  component?: string;

  /**
   * Props getter
   */
  propsGetter: (data: PlaygroundData) => Record<string, string>;
}
```

Basically, we provide a `playgroundData` object to `getter` function, and you are supposed to provide:

- A container name via `name` option
- A client component name via `component` option
- A function receiving playgroundData and returning a props map with `attr` → `value` via `propsGetter` option
