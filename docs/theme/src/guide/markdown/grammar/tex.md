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

```js {8,10} title=".vuepress/config.js"
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

<!-- @include: @md-enhance/guide/grammar/tex.md#after -->
