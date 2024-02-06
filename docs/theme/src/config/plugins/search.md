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
- vuepress-plugin-search-pro
- @vuepress/plugin-search

Only 1 of the 3 can be enabled at the same time, and the priority is `docsearch` > `searchPro` > `search`.

## plugins.docsearch

Options which will be passed to `@vuepress/plugin-docsearch`, for details, see [DocSearch plugin documentation][docsearch].

::: note

You need to install `@vuepress/plugin-docsearch` manually.

:::

## plugins.searchPro

You can set it to `true` to enable it directly, or an object to configure will be passed to `vuepress-plugin-search-pro`.

For details, see <ProjectLink name="search-pro">search-pro documentation</ProjectLink>.

::: note

You need to install `vuepress-plugin-search-pro` manually.

:::

## plugins.search

You can set it to `true` to enable it directly, or an object to configure will be passed to `@vuepress/plugin-search`.

For details, see [search plugin documentation][search].

::: note

You need to install `@vuepress/plugin-search` manually.

:::

[docsearch]: https://ecosystem.vuejs.press/plugins/docsearch.html
[search]: https://ecosystem.vuejs.press/plugins/search.html
