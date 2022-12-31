---
title: 目录页面
icon: tree
order: 6
category:
  - 布局
tag:
  - 目录
  - 布局
---

VuePress Theme Hope 默认使用 [`vuepress-plugin-catalog`][auto-catalog] 为每个文件夹自动生成带有目录的 `README.md`。

<!-- more -->

## 介绍

你可以在主题选项中使用 `plugin.autoCatalog` 来控制此功能。 如果要禁用它，请将 `plugin.autoCatalog` 设置为 `false`。

你可以使用 `plugin.autoCatalog.exclude` 从目录生成中排除一些文件夹，也可以使用 `plugin.autoCatalog.frontmatter` 来控制 frontmatter 的生成。

有关详细信息，请参阅 [Auto Catalog Plugin Docs][auto-catalog]。

[auto-catalog]: https://vuepress-theme-hope.github.io/v2/zh/auto-catalog/
