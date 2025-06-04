---
title: Theme Extension
icon: clone
order: -1
category:
  - Advanced
tag:
  - Advanced
  - Customize
---

Extend `vuepress-theme-hope` to create custom themes.

<!-- more -->

## Extension Setup

Create a theme entry file importing `hopeTheme`:

```ts
import { hopeTheme } from "vuepress-theme-hope";

export default (options: ThemeOptions) => ({
  name: "your-custom-theme",
  extends: hopeTheme(options),
  // customizations
});
```

Your theme's `alias` (in theme options) and `layouts` (in client config file) override the parent theme's configurations.

::: code-tabs#language

@tab TS

```ts twoslash title=".vuepress/theme/index.ts"
import { getDirname, path } from "vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";
import type { ThemeOptions } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default (options: ThemeOptions) => ({
  name: "vuepress-theme-local",

  extends: hopeTheme(options, { custom: true }),

  alias: {
    // You can override or add aliases here
    // For example, here we change the vuepress-theme-hope HomePage component to components/HomePage.vue under our own theme
    "@theme-hope/components/home/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue",
    ),
  },
});
```

@tab JS

```js title=".vuepress/theme/index.js"
import { getDirname, path } from "vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default (options) => ({
  name: "vuepress-theme-local",

  extends: hopeTheme(options, { custom: true }),

  alias: {
    // You can override or add aliases here
    // For example, here we change the vuepress-theme-hope HomePage component to components/HomePage.vue under our own theme
    "@theme-hope/components/home/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue",
    ),
  },
});
```

:::

You can also override or add layouts provided by `vuepress-theme-hope` via `layouts` in your theme client config file.

<!-- @include: ../customize/slots.md#layout -->

For details see [Customize Layout with Slots](../customize/slots.md).
