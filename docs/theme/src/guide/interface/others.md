---
title: Other features
icon: others
index: 5
category:
  - Interface
tag:
  - Interface
---

## Style Customization

The theme allows you to set variables in `.vuepress/styles/config.scss` and `.vuepress/styles/palette.scss` to customize most of the colors, responsive breakpoints, page layout size and other parameters.

For detailed info, please see [Config → Style Customize](../../config/style.md)

## Fullscreen Button

Enabled by default, it’s in outlook popup window in navbar.

If you don’t need it, you can disable it by setting `fullscreen: false` in the theme options.

::: tip

If the current browser does not support full screen, the full screen button is automatically hidden.

:::

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // Enable by default
    fullscreen: false,
  },
});
```

@tab JS

```js {7}
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    // Enable by default
    fullscreen: false,
  }),
};
```

:::

## Back to top button

`vuepress-theme-hope` adds a back-to-top control which will display after scrolling down 300px by default.

You can set `backToTop: false` in theme options to disable it, or set it to a number to change the default trigger distance.
