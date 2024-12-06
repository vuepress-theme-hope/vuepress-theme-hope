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

## 介绍

主题内置支持以下三个插件:

- @vuepress/plugin-docsearch
- @vuepress/plugin-slimsearch
- @vuepress/plugin-search

::: important

你需要手动安装你想要的插件。

搜索插件只能同时启用其中 1 个，优先级为 `docsearch` > `slimsearch` > `search`。

:::

## plugins.docsearch

传递给 `@vuepress/plugin-docsearch` 的选项，详情请参阅 [DocSearch 插件文档][docsearch]。

## plugins.slimsearch

你可以将其设置为 `true` 来直接启用它，或者将其设置为将传递给 `@vuepress/plugin-slimsearch` 的配置对象。

更多详情，请参阅 [SlimSearch 插件文档][slimsearch]。

::: note

你需要手动安装 `@vuepress/plugin-slimsearch`。

:::

## plugins.search

你可以将其设置为 `true` 来直接启用它，或者将其设置为将传递给 `@vuepress/plugin-search` 的配置对象。

详情请参阅 [search 插件文档][search]。

::: note

你需要手动安装 `@vuepress/plugin-search`。

:::

[docsearch]: https://ecosystem.vuejs.press/zh/plugins/search/docsearch.html
[search]: https://ecosystem.vuejs.press/zh/plugins/search/search.html
[slimsearch]: https://ecosystem.vuejs.press/zh/plugins/search/slimsearch.html
