---
title: Other features
icon: others
order: 5
category:
  - Interface
tag:
  - Interface
---

## Style Customization

The theme allows you to set variables in `.vuepress/styles/config.scss` and `.vuepress/styles/palette.scss` to customize most of the colors, responsive breakpoints, page layout size and other parameters.

For detailed info, please see [Config → Style Customize](../../config/style.md)

## Fullscreen Button

If you need it, you can enable it by setting `fullscreen: true` in the theme options.

::: tip

If the current browser does not support full screen, the full screen button is automatically hidden.

:::

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    fullscreen: true,
  }),
});
```

@tab JS

```js
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    fullscreen: true,
  }),
};
```

:::

## Back to top button

`vuepress-theme-hope` adds a back-to-top control which will display after scrolling down 300px by default.

You can set `backToTop: false` in theme options to disable it, or set it to a number to change the default trigger distance.
