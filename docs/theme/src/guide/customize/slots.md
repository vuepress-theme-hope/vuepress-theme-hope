---
title: Customize Layouts with Slots
icon: boxes-packing
order: 6
category:
  - Customize
tag:
  - Customize
  - Layout
  - Slots
---

## Theme layouts

The theme provides the following layouts:

- Layout: Basic layout
- NotFound: 404 page layout
- Slides (Only available when [reveal.js is enabled](../../guide/markdown/content/revealjs.md))
- Blog (Only available when [blog is enabled](../../guide/blog/intro.md))

## Customize Layouts with Slots

You can add new layouts or override existing layouts via `layouts` option in [client config file](../../cookbook/vuepress/config.md#client-config-file).

<!-- #region layout -->

```vue title=".vuepress/layout/Home.vue"
<script setup lang="ts">
import { Layout } from "vuepress-theme-hope/client";
</script>

<template>
  <Layout>
    <!-- Overriding default hero logo to advanced ones, like home page of theme docs -->
    <template #heroLogo>
      <div>A 3D logo</div>
    </template>
    <!-- Introduce comment component using pageBottom slot -->
    <template #pageBottom>
      <CommentService />
    </template>
  </Layout>
</template>
```

```vue title=".vuepress/layout/Layout.vue"
<script setup lang="ts">
import { Layout } from "vuepress-theme-hope/client";
</script>

<template>
  <Layout>
    <!-- Adding ADs before Markdown content with contentBefore slot -->
    <template #contentBefore>
      <div>AD contents</div>
    </template>
  </Layout>
</template>
```

```ts title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import Changelog from "./layouts/Changelog.vue";
import Home from "./layouts/Home.vue";
import Layout from "./layouts/Changelog.vue";

export default defineClientConfig({
  // You can override or add layouts here
  layouts: {
    // a home page layout with customized hero logo
    Home,
    // For example, here we change the default layout of vuepress-theme-hope to layouts/Layout.vue with ADs
    Layout,
    // Also we added a Changelog layout
    Changelog,
  },
});
```

<!-- #endregion layout -->

The basic layouts can be imported from `vuepress-theme-hope/client`:

```ts
import { Layout, NotFound } from "vuepress-theme-hope/client";
```

The Blog layout can be imported from `vuepress-theme-hope/blog`:

```ts
import { Blog } from "vuepress-theme-hope/blog";
```

The Slides layout can be imported from `@vuepress/plugin-revealjs/layouts`:

```ts
import { SlidePage } from "@vuepress/plugin-revealjs/layouts";
```

::: tip

For demo of common slots, please check:

- [Page Slot demo](../../demo/page-slot.md)
- [Home Slot demo](../../demo/home-slot.md)
- [Blog Slot demo](../../demo/blog-slot.md)

:::

## Slots of `<Layout>`

### Slots Available in All Type of Pages

- `default`

  The slot of page content, which is the main slot of the layout.

  Overriding the slot will override the whole page content (only navbar and sidebar are preserved).

  If you have some pages that is wholely built by Vue Components instead of Markdown, you can override this slot to build your own page.

- `content`

  A slot for page content, this replaces all content generated from Markdown, including contents coming from `contentBefore` and `contentAfter`.

- `contentBefore`

  A slot before content generated from Markdown, and after the page title and toc.

  Note: This slot won't work' when `content` slot is set.

- `contentAfter`

  A slot after content generated from Markdown, and before page meta and page nav.

  Note: This slot won't work' when `content` slot is set.

- `navScreenTop`

  A slot at the top of nav screen.

  The nav screen is the popup screen when you click the top right menu button in mobile view.

- `navScreenBottom`

  A slot at the bottom of nav screen.

  The nav screen is the popup screen when you click the top right menu button in mobile view.

- `sidebarItems`

  A slot for sidebar items.

- `sidebarTop`

  A slot at the top of sidebar.

- `sidebarBottom`

  A slot at the bottom of sidebar.

### Slots Available in Content Page

- `pageTop`

  A slot at the top of the page content.

- `pageBottom`

  A slot at the bottom of the page content.

- `toc`

  A slot for table of contents, receiving a array of headings.

  This will override the default table of contents element. You can use this slot to build your own table of contents.

- `tocBefore`

  A slot in page toc, before the actual table of contents. Useful for adding sponsor links or ads.

- `tocAfter`

  A slot in page toc, after the actual table of contents. Useful for adding sponsor links or ads.

### Slots Available in Home Page

- `heroInfo`: A slot for hero info.

- `heroLogo`: A slot for hero logo.

- `heroBg`: A slot for hero background.

- `heroBefore`: A slot before homepage hero.

- `heroAfter`: A slot after homepage hero.

### Slots Available in Portfolio Page

- `portfolioInfo`: A slot for portfolio info.

- `portfolioAvatar`: A slot for portfolio avatar.

- `portfolioBg`: A slot for portfolio background.

## Slots of `<NotFound>`

- `default`: 404 content slot

- `navScreenTop`

  A slot at the top of nav screen.

  The nav screen is the popup screen when you click the top right menu button in mobile view.

- `navScreenBottom`

  A slot at the bottom of nav screen.

  The nav screen is the popup screen when you click the top right menu button in mobile view.

## Slots of `<Blog>`

### Slots Available in all Blog Page

- `default`: Blog content slot

  The slot of page content, which is the main slot of the layout.

  Overriding the slot will override the whole page content (only navbar and sidebar are preserved).

  If you have some pages that is wholely built by Vue Components instead of Markdown, you can override this slot to build your own page.

- `navScreenTop`

  A slot at the top of nav screen.

  The nav screen is the popup screen when you click the top right menu button in mobile view.

- `navScreenBottom`

  A slot at the bottom of nav screen.

  The nav screen is the popup screen when you click the top right menu button in mobile view.

- `articlesBefore`: A slot before articles list.

- `articlesAfter`: A slot after articles list.

- `bloggerInfo`: A slot for blogger info.

- `infoBefore`: A slot before blog info panel.

- `infoAfter`: A slot after blog info panel.

### Slots Available in Home, Category, Tag Page

- `articleCover`: A slot for article cover.

- `articleTitle`: A slot for article title.

- `articleInfo`: A slot for article info.

- `articleExcerpt`: A slot for article excerpt.

### Slots Available in Blog Home Page

- `content`

  A slot for page content, this replaces all content generated from Markdown, including contents coming from `contentBefore` and `contentAfter`.

- `contentBefore`

  A slot before content generated from Markdown, and after the page title and toc.

  Note: This slot won't work' when `content` slot is set.

- `contentAfter`

  A slot after content generated from Markdown, and before page meta and page nav.

  Note: This slot won't work' when `content` slot is set.

- `heroInfo`: A slot for hero info.

- `heroLogo`: A slot for hero logo.

- `heroBg`: A slot for hero background.

- `heroBefore`: A slot before homepage hero.

- `heroAfter`: A slot after homepage hero.
