---
title: Other features
icon: others
category:
  - Interface
tag:
  - Interface
---

## Style customization

The theme allows you to set variables in the `config.scss` and `palette.scss` of `.vuepress/style` to customize most of the colors, responsive breakpoints, page layout size and other parameters.

For detailed info, please see [Config → Style Customize](../../config/style.md)

## Fullscreen Button

Enabled by default, it’s in outlook popup window in navbar.

If you don’t need it, you can disable it by setting `fullscreen` to `false` in the themeConfig.

::: tip

If the current browser does not support full screen, the full screen button is automatically hidden.

:::

:::: code-group

::: code-group-item TS

```ts {7}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    // Enable by default
    fullscreen: false,
  },
});
```

:::

::: code-group-item JS

```js {7}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    // Enable by default
    fullscreen: false,
  },
});
```

:::

::::

## Back to top button

`vuepress-theme-hope` adds a back-to-top control which will display after scrolling down 300px by default.

You can set `backToTop` to `false` in `themeConfig` to disable it, or set it to a number to change the default trigger distance.
