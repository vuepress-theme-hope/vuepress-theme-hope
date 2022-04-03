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

You need to create an entry file for your theme and set `extends: "vuepress-theme-hope"` to extend the `vuepress-theme-hope` theme.

The aliases of the same name (`alias`) and layouts (`layouts`) of your own newly created theme has higher priority over the extended theme `vuepress-theme-hope`, which means that you can override `vuepress-theme-hope` components via `alias` and add or override layout provided by `vuepress-theme-hope` via `layouts`.

:::: code-group

::: code-group-item TS

```ts
// .vuepress/theme/index.ts
import { path } from "@vuepress/utils";

export default {
  name: "vuepress-theme-local",
  extends: "vuepress-theme-hope",
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
};
```

:::

::: code-group-item JS

```js
// .vuepress/them/index.js
const { path } = require("@vuepress/utils");

module.exports = {
  name: "vuepress-theme-local",
  extends: "vuepress-theme-hope",
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
};
```

:::

::::
