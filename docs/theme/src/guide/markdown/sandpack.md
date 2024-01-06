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

```ts {10}
// .vuepress/config.ts
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

```js {9}
// .vuepress/config.js
import { mdEnhance } from "vuepress-plugin-md-enhance";

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
