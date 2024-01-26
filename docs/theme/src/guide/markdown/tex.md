---
title: TeX
icon: square-root-variable
category:
  - Markdown
tag:
  - Markdown
  - TEX
---

<!-- @include: @md-enhance/guide/grammar/tex.md#before -->

::: code-tabs#language

@tab TS

```ts {8-13} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // Enable Tex Support using katex
        katex: true,
        // Enable Tex Support using mathjax
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
        // Enable Tex Support using katex
        katex: true,
        // Enable Tex Support using mathjax
        mathjax: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/guide/grammar/tex.md#after -->
