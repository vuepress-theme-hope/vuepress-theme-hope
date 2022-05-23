---
title: Theme Extending
icon: extend
category:
  - Advanced
tag:
  - Advanced
  - Customize
---

`vuepress-theme-hope` supports extending just like `@vuepress/theme-default`.

You can create your own theme based on `vuepress-theme-hope` and use it locally or publish it according to your needs.

## Theme extending

You need to create an entry file for your theme and import `hopeTheme` from `vuepress-theme-hope`.

In your entry file, set `extends: hopeTheme(options)` to extend the `vuepress-theme-hope` theme.

The aliases of the same name (`alias`) and layouts (`layouts`) of your own newly created theme has higher priority over the extended theme `vuepress-theme-hope`, which means that you can override `vuepress-theme-hope` components via `alias` and add or override layout provided by `vuepress-theme-hope` via `layouts`.

::: code-tabs#language

@tab TS

```ts
// .vuepress/theme/index.ts
import { path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";
import type { HopeThemeOptions } from "vuepress-theme-hope";

export const localTheme = (options: HopeThemeOptions) => ({
  name: "vuepress-theme-local",

  extends: hopeTheme(options),

  alias: {
    // You can override or add aliases here
    // For example, here we change the vuepress-theme-hope HomePage component to components/HomePage.vue under our own theme
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue"
    ),
  },

  layouts: {
    // You can override or add layouts here
    // For example, here we change the default layout of vuepress-theme-hope to layouts/Layout.vue under our own theme
    Layout: path.resolve(__dirname, "layouts/Layout.vue"),
    // Also we added a Changelog layout
    Changelog: path.resolve(__dirname, "layouts/Changelog.vue"),
  },
});
```

@tab JS

```js
// .vuepress/them/index.js
const { path } = require("@vuepress/utils");
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = (options) => ({
  name: "vuepress-theme-local",

  extends: hopeTheme(options),

  alias: {
    // You can override or add aliases here
    // For example, here we change the vuepress-theme-hope HomePage component to components/HomePage.vue under our own theme
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue"
    ),
  },

  layouts: {
    // You can override or add layouts here
    // For example, here we change the default layout of vuepress-theme-hope to layouts/Layout.vue under our own theme
    Layout: path.resolve(__dirname, "layouts/Layout.vue"),
    // Also we added a Changelog layout
    Changelog: path.resolve(__dirname, "layouts/Changelog.vue"),
  },
});
```

:::
