---
title: Tex 语法
icon: square-root-variable
category:
  - Markdown
tag:
  - Markdown
  - TEX
---

<!-- @include: @md-enhance/zh/guide/grammar/tex.md#before -->

::: code-tabs#language

@tab TS

```ts {8-13} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 使用 KaTeX 启用 TeX 支持
        katex: true,
        // 使用 mathjax 启用 TeX 支持
        mathjax: true,
      },
    },
  }),
});
```

@tab JS

```js {7-12} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 使用 KaTeX 启用 TeX 支持
        katex: true,
        // 使用 mathjax 启用 TeX 支持
        mathjax: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/zh/guide/grammar/tex.md#after -->
