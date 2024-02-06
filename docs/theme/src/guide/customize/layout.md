---
title: Customize Layouts
icon: clone
order: 5
category:
  - Customize
tag:
  - Customize
  - Layout
---

This tutorial guides you how to customize theme layout.

<!-- more -->

## With Theme Options

The theme provides many layout-related options for you to customize the layout of the theme. For details about these options, see [Theme Configuration → Layout](../../config/theme/layout.md).

## Responsive BreakPoints

The theme will automatically apply responsive layouts under different screen widths. If you need to modify these breakpoints, you can modify them in [style config file](../../config/style.md#configscss).

```scss title=".vuepress/styles/config.scss"
// Modify the breakpoint of the desktop layout
$pc = 1280px;
```

For details about breakpoint variables `$pc`, `$laptop`, `$pad`, `$tablet`, `$mobile`, see [Theme Configuration → Styles](../../config/style.md#configscss).

## Layout Size

The theme provides common size variables in the [style palette file](../../config/style.md#palettescss), and you can modify these variables in the palette file to achieve the purpose of modifying the layout size.

```scss title=".vuepress/styles/palette.scss"
// Modify the height of the navigation bar
$navbar-height = 80px;
```

Introduction of layout variables can be found at [Theme Configuration → Style](../../config/style.md#palettescss).

## Via Style File

The [style file](../../config/style.md#indexscss) is `.vuepress/styles/index.scss` in the project directory, where you can put your own styles.

- If you are not satisfied with the style of the theme, you can adjust the style of the theme components through the [style file](../../config/style.md#indexscss).

  ::: note

  In order to override the original style, you need to use the same or higher priority selector or use `!important` directly.

  :::

- If you want to remove some features, you can hide related dom elements by `display: none` in the [style file](../../config/style.md#indexscss).

## Adding / Overriding Layouts

You can add new layouts or override existing layouts via `layouts` option in [client config file](../../cookbook/vuepress/config.md#client-config-file).

<!-- #region layout -->

::: code-tabs#language

@tab TS

```ts title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import Changelog from "./layouts/Changelog.vue";
import Layout from "./layouts/Layout.vue";

export default defineClientConfig({
  // You can override or add layouts here
  layouts: {
    // For example, here we change the default layout of vuepress-theme-hope to layouts/Layout.vue
    Layout,
    // Also we added a Changelog layout
    Changelog,
  },
});
```

@tab JS

```js title=".vuepress/client.js"
import { defineClientConfig } from "vuepress/client";
import Changelog from "./layouts/Changelog.vue";
import Layout from "./layouts/Layout.vue";

export default defineClientConfig({
  // You can override or add layouts here
  layouts: {
    // For example, here we change the default layout of vuepress-theme-hope to layouts/Layout.vue
    Layout,
    // Also we added a Changelog layout
    Changelog,
  },
});
```

:::

<!-- #endregion layout -->

The theme provides the following layouts:

- Layout

  Basic layout, having the following slots:

  - `default`: Page content slot
  - `top`: Page top slot
  - `bottom`: Page bottom slot
  - `contentBefore`: Slot before page content
  - `contentAfter`: Slot after page content
  - `tocBefore`: Slot before page TOC
  - `tocAfter`: Slot after page TOC

- NotFound

  404 page layout, having the following slots:

  - `default`: 404 content slot

- Slide (Only available when reveal.js is enabled)
- BlogCategory (Only available when blog is enabled)
- BlogHome (Only available when blog is enabled)
- BlogType (Only available when blog is enabled)
- Timeline (Only available when blog is enabled)

## By Overriding Components

See [Replace theme components](../advanced/replace.md) .
