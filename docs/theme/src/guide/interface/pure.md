---
title: Pure Mode
icon: leaf
order: -2
category:
  - Interface
tag:
  - Interface
---

If your site is a documentation-only site, and you prefer a clean style, you can enable pure mode by setting `pure: true` in theme options.

::: code-tabs#language

@tab TS

```ts {7} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    pure: true,
  }),
});
```

@tab JS

```js {7} title=".vuepress/config.js"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    pure: true,
  }),
});
```

:::

In this mode, we disable some fancy animations and some colors and just provide functionality.
