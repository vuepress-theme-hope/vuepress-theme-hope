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

```js {7-37} title=".vuepress/config.js"
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
    },
  }),
};
```

<!-- @include: @md-enhance/zh/guide/code/playground.md#after -->
