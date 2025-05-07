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

```vue title=".vuepress/layout/Layout.vue"
<script setup lang="ts">
import { Layout } from "vuepress-theme-hope/client";
</script>

<template>
  <Layout>
    <!-- Adding ADs before markdown content with contentBefore slot -->
    <template #contentBefore>
      <div>Advertisement contents</div>
    </template>
  </Layout>
</template>
```

```ts title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import Changelog from "./layouts/Changelog.vue";
import Layout from "./layouts/Changelog.vue";

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

  Also these slots are supported for home page:

  - `heroBefore`: Slot before hero
  - `heroAfter`: Slot after hero
  - `homeContent`: Slot for home page content

- NotFound

  404 page layout, having the following slots:

  - `default`: 404 content slot

- Slides (Only available when reveal.js is enabled)

- Blog (Only available when blog is enabled)

### Layout Slots

- `default`

  The slot of page content, which is the main slot of the layout.

  Overriding the slot will override the whole page content (only navbar and sidebar are preserved).

  If you have some pages that is wholely built by Vue Components instead of markdown, you can override this slot to build your own page.

- `pageTop`

  A slot at the top of the page, before breadcrumbs, page title and toc.

- `pageBottom`

  A slot at the bottom of the page, after page meta, page nav and comment box.

- `content`

  A slot for page content, this replaces all content generated from markdown, including contents coming from `contentBefore` and `contentAfter`.

- `contentBefore`

  A slot before content generated from markdown, and after the page title and toc.

  Note: This slot won't work' when `content` slot is set.

- `contentAfter`

  A slot after content generated from markdown, and before page meta and page nav.

  Note: This slot won't work' when `content` slot is set.

- `toc`

  A slot for table of contents, receiving a array of headings.

  This will override the default table of contents element. You can use this slot to build your own table of contents.

- `tocBefore`

  A slot in page toc, before the actual table of contents. Useful for adding sponsor links or ads.

- `tocAfter`

  A slot in page toc, after the actual table of contents. Useful for adding sponsor links or ads.

- `navScreenTop`

  A slot at the top of nav screen.

  The nav screen is the popup screen when you click the top right menu button in mobile view.

- `navScreenBottom`

  A slot at the bottom of nav screen.

  The nav screen is the popup screen when you click the top right menu button in mobile view.

- `sidebarItems`

  A slot for sidebar items.

  This slot will override the default sidebar items element. You can use this slot to build your own sidebar items.

- `sidebarTop`

  A slot at the top of sidebar.

- `sidebarBottom`

  A slot at the bottom of sidebar.

- `heroInfo`

  A slot for hero info.

  This slot will override the default hero info element. You can use this slot to build your own hero info.

## By Overriding Components

See [Replace theme components](../advanced/replace.md) .
