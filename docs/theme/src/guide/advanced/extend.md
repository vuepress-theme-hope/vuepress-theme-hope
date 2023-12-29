---
title: Theme Extending
icon: clone
order: -1
category:
  - Advanced
tag:
  - Advanced
  - Customize
---

`vuepress-theme-hope` supports extending just like `@vuepress/theme-default`.

You can create your own theme based on `vuepress-theme-hope` and use it locally or publish it according to your needs.

## How to Extend Theme Hope

You need to create an entry file for your theme and import `hopeTheme` from `vuepress-theme-hope`.

In your entry file, set `extends: hopeTheme(options)` to extend the `vuepress-theme-hope` theme.

The aliases of the same name (`alias`) and layouts (`layouts`) of your own newly created theme has higher priority over the extended theme `vuepress-theme-hope`, which means that you can override `vuepress-theme-hope` components via `alias` option in theme api, and you can add or override layouts via `layouts` in client config file.

::: code-tabs#language

@tab TS

```ts
// .vuepress/theme/index.ts
import { getDirname, path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";
import type { ThemeOptions } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default (options: ThemeOptions) => ({
  name: "vuepress-theme-local",

  extends: hopeTheme(options, { custom: true }),

  alias: {
    // You can override or add aliases here
    // For example, here we change the vuepress-theme-hope HomePage component to components/HomePage.vue under our own theme
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue",
    ),
  },
});
```

@tab JS

```js
// .vuepress/theme/index.js
import { getDirname, path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default (options) => ({
  name: "vuepress-theme-local",

  extends: hopeTheme(options, { custom: true }),

  alias: {
    // You can override or add aliases here
    // For example, here we change the vuepress-theme-hope HomePage component to components/HomePage.vue under our own theme
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue",
    ),
  },
});
```

:::

Also, you can add or override layout provided by `vuepress-theme-hope` via `layouts` in your theme client config file.

<!-- @include: ../customize/layout.md#layout -->
