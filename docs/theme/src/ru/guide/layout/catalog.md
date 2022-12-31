---
title: Catalog Page
icon: tree
order: 6
category:
  - Layout
tag:
  - Catalog
  - Layout
---

VuePress Theme Hope automatically generate `README.md` with catalog for each folder by default using [`vuepress-plugin-catalog`][auto-catalog].

<!-- more -->

## Introduction

You can use `plugin.autoCatalog` in theme options to control this feature. If you want to disable it, set `plugin.autoCatalog` to `false`.

You can use `plugin.autoCatalog.exclude` to exclude some folders from catalog generation, and you can use `plugin.autoCatalog.frontmatter` to control frontmatter generation.

For more details, see [Auto Catalog Plugin Docs][auto-catalog].

[auto-catalog]: https://vuepress-theme-hope.github.io/v2/auto-catalog/
