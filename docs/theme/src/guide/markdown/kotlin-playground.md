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

<!-- @include: @md-enhance/guide/code/vue-playground.md#settings -->

::: code-tabs#language

@tab TS

```ts {10}
// .vuepress/config.ts
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

```js {10}
// .vuepress/config.js
import { mdEnhance } from "vuepress-plugin-md-enhance";

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
