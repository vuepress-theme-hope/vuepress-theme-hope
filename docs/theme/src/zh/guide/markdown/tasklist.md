---
title: 任务列表
icon: square-check
category:
  - Markdown
tag:
  - Markdown
  - 任务列表
---

让你的 VuePress 站点中的 Markdown 文件支持任务列表。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        tasklist: true,
      },
    },
  }),
});
```

@tab JS

```js {7-9}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        tasklist: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/zh/guide/grammar/tasklist.md#after -->
