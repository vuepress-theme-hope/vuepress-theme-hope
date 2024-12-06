---
title: Search Plugin Config
icon: search
order: 5
category:
  - Config
tag:
  - Search
  - Plugin Config
  - Theme Config
---

## Intro

The theme adds built-in support for the following three plugins:

- @vuepress/plugin-docsearch
- @vuepress/plugin-search
- @vuepress/plugin-slimsearch

::: important

You need to install the plugin that you want manually.

Only 1 of the 3 search plugins can be enabled at the same time, and the priority is `docsearch` > `slimsearch` > `search`.

:::

## plugins.docsearch

Options which will be passed to `@vuepress/plugin-docsearch`, for details, see [DocSearch plugin documentation][docsearch].

## plugins.slimsearch

You can set it to `true` to enable it directly, or an object to configure will be passed to `@vuepress/plugin-slimsearch`.

For details, see [SlimSearch plugin documentation][slimsearch].

## plugins.search

You can set it to `true` to enable it directly, or an object to configure will be passed to `@vuepress/plugin-search`.

For details, see [search plugin documentation][search].

[docsearch]: https://ecosystem.vuejs.press/plugins/search/docsearch.html
[slimsearch]: https://ecosystem.vuejs.press/plugins/search/slimsearch.html
[search]: https://ecosystem.vuejs.press/plugins/search/search.html
