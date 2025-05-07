---
title: Customize Layouts with Slots
icon: clone
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

## Slots of `<Layout>`

### Slots Available in All Type of Pages

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

### Slots Available in Content Page

- `toc`

  A slot for table of contents, receiving a array of headings.

  This will override the default table of contents element. You can use this slot to build your own table of contents.

- `tocBefore`

  A slot in page toc, before the actual table of contents. Useful for adding sponsor links or ads.

- `tocAfter`

  A slot in page toc, after the actual table of contents. Useful for adding sponsor links or ads.

These slots are supported for default home page only (normal page does not have these slots):

- `heroInfo`

  A slot for hero info.

  This slot will override the default hero info element. You can use this slot to build your own hero info.

## Slots of `<NotFound>`

- `default`: 404 content slot
