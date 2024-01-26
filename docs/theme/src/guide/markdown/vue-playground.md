---
title: Vue Playground
icon: fab fa-vuejs
category:
  - Markdown
tag:
  - Markdown
  - Playground
---

Let the Markdown file support vue playground in your VuePress site.

<!-- more -->

::: tip

Since we are providing a runtime compiler, we are introducing the whole `@vue/compiler-sfc` package with typescript support, so the whole Vue Playground chunk is > 4MB. So you should only use this if you are heavily depending on interactive Vue Playground.

You can use [Vue Demo](./demo.md#vue) and [Playground Vue Preset](./playground.md) as an alternative.

:::

<!-- @include: @md-enhance/guide/code/vue-playground.md#settings -->

::: code-tabs#language

@tab TS

```ts {9} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // enable vue playground
        vuePlayground: true,
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
        // enable vue playground
        vuePlayground: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/guide/code/vue-playground.md#after -->
