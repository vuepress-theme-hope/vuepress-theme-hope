---
title: 交互演示
icon: code
category:
  - Markdown
tag:
  - Markdown
  - 交互演示
---

让你的 VuePress 站点中的 Markdown 文件支持交互演示。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8-37} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    mdEnhance: {
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
            propsGetter: (
              playgroundData: PlaygroundData,
            ): Record<string, string> => ({
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
    },
  }),
});
```

@tab JS

```js {8-37} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    mdEnhance: {
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
            propsGetter: (
              playgroundData: PlaygroundData
            ): Record<string, string> => ({
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
    },
  }),
};
```

:::

<!-- @include: @md-enhance/zh/guide/code/playground.md#middle -->

Vue 预设默认使用官方交互演示，并不像 [Vue 交互演示](./vue-playground.md) 支持自定义选项。因此，如果你严重依赖 Vue 交互演示，我们建议你改用 [Vue 交互演示](./vue-playground.md)。

<!-- @include: @md-enhance/zh/guide/code/playground.md#after -->
