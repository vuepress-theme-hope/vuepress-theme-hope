---
title: Catalog Page
icon: network-wired
category:
  - Feature
tag:
  - Catalog
  - Feature
---

VuePress Theme Hope provides catalog component and auto catalog generation using [`@vuepress/plugin-catalog`][catalog].

<!-- more -->

## Introduction

This feature is enabled by default. If there is no `README.md` in the folder, the theme will automatically generate a directory page for it. To disable, set `plugins.catalog` to `false`.

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    catalog: false,
  },
});
```

You can control catalog behavior via `plugins.catalog` in the theme options, for example:

- Exclude some folders from catalog generation via `plugins.catalog.exclude`
- Control frontmatter generation through `plugins.catalog.frontmatter`.

```ts twoslash {5-12} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    catalog: {
      frontmatter: (path) => {
        if (path.startsWith("/zh/")) return { title: "目录" };

        return { title: "Catalog" };
      },
      exclude: ["/api/", "/zh/api/"],
    },
  },
});
```

For detailed configuration, see [Catalog plugin docs][catalog-config].

## Catalog Component

You can use the `<Catalog>` component directly in Markdown to display the catalog.

::: md-demo Homepage Catalog Demo

<!-- Used to limit height -->
<div class="catalog-display-container">
  <Catalog base='/' />
</div>

:::

[catalog]: https://ecosystem.vuejs.press/plugins/features/catalog.html
[catalog-config]: https://ecosystem.vuejs.press/plugins/features/catalog.html#options
