---
title: Sandpack Playground
icon: code
category:
  - Markdown
tag:
  - Markdown
  - Playground
---

<!-- @include: @md-enhance/guide/code/sandpack.md#before -->

::: code-tabs#config

@tab TS

```ts {9} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // enable sandpack playground
        sandpack: true,
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
        // enable sandpack playground
        sandpack: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/guide/code/sandpack.md#after -->
