---
title: Flowchart
icon: route
category:
  - Markdown
tag:
  - Flowchart
  - Markdown
---

<!-- @include: @md-enhance/guide/chart/flowchart.md#before -->

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
        flowchart: true,
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
        flowchart: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/guide/chart/flowchart.md#after -->
