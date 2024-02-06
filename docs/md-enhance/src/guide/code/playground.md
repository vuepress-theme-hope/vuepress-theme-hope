---
title: Playground
icon: code
---

The plugin provides you playground support.

<!-- more -->

## Settings

::: code-tabs#language

@tab TS

```ts {8-36} title=".vuepress/config.ts"
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
          "unocss",
          {
            name: "playground#language",
            component: "PlaygroundComponent",
            propsGetter: (
              playgroundData: PlaygroundData,
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
          unocss: {
            // ...
          },
        },
      },
    }),
  ],
};
```

@tab JS

```js {8-36} title=".vuepress/config.js"
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
          "unocss",
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
          unocss: {
            // ...
          },
        },
      },
    }),
  ],
};
```

:::

<!-- #region middle -->

## Usage

You should add presets through `playground.presets` in plugin options.

To use playground, you should use a container named `playground#preset`.

In it, you can use 3 directives:

- `@file fileName` then a code block to add files
- `@import importMapFileName` then a json block to customize "import map"
- `@setting` then a json block to customize settings

You can see the below demos to see more details.

## Available presets

Currently, we support `ts`, `vue` and `unocss` presets, and we are looking forward to more presets coming from PRs.

If you want to add a playground of your own, you can add a preset by you own in [Advanced Section](#advanced), and welcome to open a PR about your fantastic preset.

::: info TS preset

TS preset is using official playground by default, and do not support multiple ts files, so all you need to do is add one single ts file through `@file xxx.ts` directive (the filename is not important but the `.ts` file extension is).

To use customized compilerOptions, you can provide one through `@setting` directive. But attention, official TS playground does not support all compiler options.

Meanwhile, you can customize the default compilerOption through `playground.config.ts`, and you can use another service besides the official playground through `service` option, just in case you want to deploy your own playground site.

:::

::: info Vue Preset

<!-- #endregion middle -->

Vue preset is using the official playground by default, and do not support customizing options like [Vue Playground](./vue-playground.md). So if you are heavily relying on interacting vue playground, we suggest you to use [Vue Playground](./vue-playground.md) instead.

<!-- #region after -->

But if you only want a few demos instead of bundling a whole vue playground, you can use this preset to create a `<iframe>`.

Only `service`, `dev` and `ssr` option is available in `@setting` directive.

:::

::: info UnoCSS Preset

UnoCSS preset is using [official playground](https://unocss.dev/play) by default. You can use `@file` to add three file (`index.html`, `config.js`, `style.css`), . You can set three file types as follows:

- `@file index.html` match `HTML` content. If no html file, The official default value will be used.
- `@file config.js` match `Config` content. If no config file, The official default value will be used.
- `@file style.css` match `Custom CSS` content.

❗Every file type (html/js/css) only support one file.

You can set your own service url through `playground.config.unocss.service` in plugin options.

:::

## Demo

:::: md-demo TS

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

@setting

```json
{
  "target": "es5"
}
```

:::

::::

:::: md-demo Vue

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

::::

:::: md-demo UnoCSS

::: playground#unocss UnoCSS demo

@file index.html

```html
<div class="flex flex-col text-center h-full justify-center">
  <div class="text-red">TEST for default preset</div>
  <div class="text-$fd-color">TEST for custom css</div>
</div>
```

@file config.js

```js
import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno()],
});
```

@file custom.css

```css
:root {
  --fd-color: green;
}
```

:::

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

<!-- #endregion after -->
