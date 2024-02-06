---
title: Catalog Page
icon: network-wired
order: 6
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

You can control this via `plugins.catalog` in the theme options, for example:

- Exclude some folders from catalog generation via `plugins.catalog.exclude`
- Control frontmatter generation through `plugins.catalog.frontmatter`.

For detailed configuration, see [Catalog plugin docs][catalog-config].

## Catalog Component

You can use the `<Catalog>` component directly in Markdown to display the catalog.

::: md-demo Homepage Catalog Demo

<!-- Used to limit height -->
<div class="catalog-display-container">
  <Catalog base='/' />
</div>

:::

[catalog]: https://ecosystem.vuejs.press/plugins/catalog.html
[catalog-config]: https://ecosystem.vuejs.press/plugins/catalog.html#options
