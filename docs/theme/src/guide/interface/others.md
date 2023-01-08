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

## Print Button

The theme fully optimize style for print, and there will be a print button at toc in desktop mode by default.

To hide print button, you should set `print: false` in theme options.

## Fullscreen Button

<ToggleFullScreenButton />

If you need it, you can enable it by setting `fullscreen: true` in theme options.

::: tip

If the current browser does not support full screen, the full screen button is automatically hidden.

:::

::: code-tabs#language

@tab TS

```ts {7}
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

```js {7}
// .vuepress/config.js
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    fullscreen: true,
  }),
});
```

:::

## Back to top button

`vuepress-theme-hope` adds a back-to-top control which will display after scrolling down 300px by default.

You can set `backToTop: false` in theme options to disable it, or set it to a number to change the default trigger distance.

## RTL Layout

`vuepress-theme-hope` basically supports RTL layout. Just add the following style to `.vuepress/style/index.scss`

```scss
html {
  direction: rtl;
}
```

You will see that almost everything works fine.

::: note

As we mention above, the theme **basically** supports RTL layout, because not every css property has a "direction adaptive" value, e.g.: `float: right` `transform: translateX(10px)`, so you may still need to handle some layouts yourself.

:::

<script setup lang="ts">
import ToggleFullScreenButton from "@theme-hope/modules/outlook/components/ToggleFullScreenButton";
</script>
