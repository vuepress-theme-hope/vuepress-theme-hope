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

VuePress Theme Hope provides catalog component and auto catalog generation using <ProjectLink name="auto-catalog">`vuepress-plugin-catalog`</ProjectLink>.

<!-- more -->

## Introduction

This feature is enabled by default. If there is no `README.md` in the folder, the theme will automatically generate a directory page for it. To disable, set `plugin.autoCatalog` to `false`.

You can control this via `plugin.autoCatalog` in the theme options, for example:

- Exclude some folders from catalog generation via `plugin.autoCatalog.exclude`
- Control frontmatter generation through `plugin.autoCatalog.frontmatter`.

For detailed configuration, see <ProjectLink name="auto-catalog" path="/config.html">Auto Catalog plugin docs</ProjectLink>.

## Catalog Component

You can use the `<AutoCatalog>` component directly in Markdown to display the catalog.

::: md-demo Homepage Catalog Demo

<!-- Used to limit height -->
<div class="catalog-display-container">
  <AutoCatalog base='/' />
</div>

:::
