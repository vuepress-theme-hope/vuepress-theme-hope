---
title: 搜索插件配置
icon: search
order: 5
category:
  - 配置
tag:
  - 搜索
  - 插件选项
  - 主题配置
---

## I介绍

主题内置支持以下三个插件:

- @vuepress/plugin-docsearch
- vuepress-plugin-search-pro
- @vuepress/plugin-search

你只能同时启用其中的 1 个，优先级为 `docsearch` > `searchPro` > `search`。

## plugins.docsearch

传递给 `@vuepress/plugin-docsearch` 的选项，详情请参阅 [DocSearch 插件文档][docsearch]。

::: note

你需要手动安装 `@vuepress/plugin-docsearch`。

:::

## plugins.searchPro

你可以将其设置为 `true` 来直接启用它，或者将其设置为将传递给 `vuepress-plugin-search-pro` 的配置对象。

更多详情，请参阅 <ProjectLink name="search-pro" path="/zh/">search-pro 文档</ProjectLink>。

::: note

你需要手动安装 `vuepress-plugin-search-pro`。

:::

## plugins.search

你可以将其设置为 `true` 来直接启用它，或者将其设置为将传递给 `@vuepress/plugin-search` 的配置对象。

详情请参阅 [search 插件文档][search]。

::: note

你需要手动安装 `@vuepress/plugin-search`。

:::

[docsearch]: https://ecosystem.vuejs.press/zh/plugins/docsearch.html
[search]: https://ecosystem.vuejs.press/zh/plugins/search.html
