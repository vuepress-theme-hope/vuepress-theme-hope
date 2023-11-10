---
title: 脚注
icon: quote-left
category:
  - Markdown
tag:
  - Markdown
  - 脚注
---

让你的 VuePress 站点中的 Markdown 文件支持脚注。

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
        footnote: true,
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
        footnote: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/zh/guide/content/footnote.md#after -->
