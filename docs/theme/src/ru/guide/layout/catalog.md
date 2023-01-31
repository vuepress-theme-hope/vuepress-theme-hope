---
title: Catalog Page
icon: network-wired
order: 6
category:
  - Layout
tag:
  - Catalog
  - Layout
---

VuePress Theme Hope automatically generate `README.md` with catalog for each folder by default using <ProjectLink name="auto-catalog">`vuepress-plugin-catalog`</ProjectLink>.

<!-- more -->

## Introduction

You can use `plugin.autoCatalog` in theme options to control this feature. If you want to disable it, set `plugin.autoCatalog` to `false`.

You can use `plugin.autoCatalog.exclude` to exclude some folders from catalog generation, and you can use `plugin.autoCatalog.frontmatter` to control frontmatter generation.

For more details, see <ProjectLink name="auto-catalog">Auto Catalog Plugin Docs</ProjectLink>.

## Demo

Home page catalog:

<!-- markdownlint-disable MD033 -->

<div class="catalog-display-container">
  <AutoCatalog base='/' />
</div>

<!-- markdownlint-enable MD033 -->

```md
<AutoCatalog base='/' />
```
