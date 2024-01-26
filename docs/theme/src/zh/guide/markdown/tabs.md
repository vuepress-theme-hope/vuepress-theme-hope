---
title: 选项卡
icon: table-columns
order: 2
category:
  - Markdown
tag:
  - Markdown
  - 选项卡
---

让你的 Markdown 文件支持供选项卡。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8-11} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 添加选项卡支持
        tabs: true,
      },
    },
  }),
});
```

@tab JS

```js {7-10} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 添加选项卡支持
        tabs: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/zh/guide/content/tabs.md#after -->
