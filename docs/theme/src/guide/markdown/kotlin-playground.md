---
title: Kotlin Playground
icon: fab fa-kickstarter
category:
  - Markdown
tag:
  - Markdown
  - Playground
---

Let the Markdown file support kotlin playground in your VuePress site.

<!-- more -->

<!-- @include: @md-enhance/guide/code/kotlin-playground.md#settings -->

::: code-tabs#language

@tab TS

```ts {9} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // enable kotlin playground
        kotlinPlayground: true,
      },
    },
  }),
});
```

@tab JS

```js {8} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // enable kotlin playground
        kotlinPlayground: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/guide/code/kotlin-playground.md#after -->
