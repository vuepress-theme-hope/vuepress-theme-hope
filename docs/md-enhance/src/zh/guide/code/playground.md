---
title: 交互演示
icon: code
---

插件为你带来了交互演示支持。

<!-- more -->

## 配置

::

```js {7-35} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 在此放置交互演示配置
      playground: {
        // 添加预设
        presets: [
          "ts",
          "vue",
          "unocss",
          {
            name: "playground#language",
            component: "PlaygroundComponent",
            propsGetter: (playgroundData) => ({
              // 交互演示属性
            }),
          },
        ],
        // 设置内置预设 (可选)
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

<!-- #region after -->

## 使用

你应该通过插件选项中的 `playground.presets` 添加预设。

要使用交互演示，你应该使用一个名为 `playground#preset` 的容器。

在其中，你可以使用 3 个指令：

- `@file fileName` 紧跟文件的代码块
- `@import importMapFileName` 紧跟一个自定义“导入映射”的 json 代码块
- `@setting` 紧跟一个自定义设置的 json 代码块

你可以查看以下演示以查看更多详细信息。

## 可用预设

目前，我们支持 `ts`、`vue`和 `unocss` 预设，我们期待更多来自 PR 的预设。

如果你想添加自己的交互演示，可以在 [高级用法](#高级用法) 中添加你自己的预设。同时我们欢迎为你的精彩预设创建 PR。

::: info TS 预设

TS 预设默认使用官方交互演示，不支持多个 ts 文件，所以你需要做的就是通过 `@file xxx.ts` 指令添加一个 ts 文件 (文件名不重要，但需要 `.ts` 文件扩展名)。

要使用定制化的编译器选项，你可以通过 `@setting` 指令提供一个。但请注意，官方 TS Playground 并不支持所有的编译器。

同时，你可以通过插件选项中的 `playground.config.ts` 自定义默认的 compilerOption，通过 `service` 选项可以使用官方交互演示之外的其他服务，以防你想部署自己的交互演示站点。

:::

::: info Vue 预设

Vue 预设默认使用官方 playground，并不像 [Vue Playground](./vue-playground.md) 支持自定义选项。因此，如果你严重依赖 Vue 交互演示，我们建议你改用 [Vue 交互演示](./vue-playground.md)。

但是如果你只想要几个演示而不是捆绑整个 Vue 交互演示，你可以使用这个预设来创建一个 `<iframe>`。

`@setting` 指令中只有 `service`、`dev` 和 `ssr` 选项可用。

:::

::: info UnoCSS 预设

UnoCSS 预设默认使用[官方 playground](https://unocss.dev/play)，可通过 `@file` 指定添加三个文件（`index.html`, `config.js`, `style.css`），对应官方 playground 的相应输入：

- `@file index.html` 对应 `HTML`，没有对应文件则会使用官方的默认值
- `@file config.js` 对应 `Config`，没有对应文件则会使用官方默认值
- `@file style.css` 对应 `Custom CSS`，没有则为空

:heavy_exclamation_mark: 注意该预设不支持多个 html/js/css 文件
在配置中，可以通过 `playground.config.unocss` 中的 `service` 选项使用官方交互演示之外的其他服务，以防你想部署自己的交互演示站点
:::

## 案例

:::: preview TS

::: playground#ts TS 案例 1

@file index.ts

```ts
const msg = "你好世界";

const speak = (msg: string) => console.log(msg);

speak(msg);
```

:::

::: playground#ts TS 案例 2

@file index.ts

```ts
const msg = "你好世界";

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

:::: preview Vue

::: playground#vue 使用自定义导入的 Vue 案例

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

::: playground#vue 使用自定义设置的 Vue 案例

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

:::: preview UnoCSS

::: playground#unocss UnoCSS 案例

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

## 高级用法

你可以提供自己的预设。

```ts
interface PlaygroundCodeConfig {
  /**
   * 代码块扩展名
   *
   * @description 它基于文件名，而不是代码块语言
   */
  ext: string;

  /**
   * 代码块内容
   */
  content: string;
}

interface PlaygroundData {
  /**
   * 交互演示标题
   */
  title?: string;

  /**
   * Import map 文件名
   *
   * @default 'import-map.json'
   */
  importMap?: string;

  /**
   * 交互演示件信息
   */
  files: Record<
    /**
     * 文件名
     */
    string,
    /**
     * 文件详情
     */
    PlaygroundCodeConfig
  >;

  /**
   * 交互演示设置
   *
   * @description 它是设置指令后的 json 内容的解析结果
   */
  settings: Record<string, unknown>;

  /**
   * 根据交互演示内容生成的 hash key
   */
  key: string;
}

interface PlaygroundOptions {
  /**
   * 交互演示容器名
   */
  name: string;

  /**
   * 交互演示组件名称
   *
   * @default 'Playground'
   */
  component?: string;

  /**
   * 属性获取器
   */
  propsGetter: (data: PlaygroundData) => Record<string, string>;
}
```

我们为 `getter` 函数提供了一个 `playgroundData` 对象，你应该提供下列内容:

- 通过 `name` 选项提供容器名称
- 通过 `component` 选项提供客户端组件名称
- 通过 `propsGetter` 选项提供一个接收 playgroundData 并返回格式为 `attr` → `value` 属性映射的函数

<!-- #endregion after -->
