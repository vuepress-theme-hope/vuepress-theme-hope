---
title: Search Plugin Config
icon: search
order: 3
category:
  - Config
tag:
  - Search
  - Plugin Config
  - Theme Config
---

## Intro

The theme adds built-in support for the following 4 plugins:

- @vuepress/plugin-docsearch
- @vuepress/plugin-meilisearch
- @vuepress/plugin-search
- @vuepress/plugin-slimsearch

::: important

You need to install the plugin that you want manually.

Only 1 of the 4 search plugins can be enabled at the same time, and the priority is `docsearch` > `meilisearch` > `slimsearch` > `search`.

:::

## plugins.docsearch

Options which will be passed to `@vuepress/plugin-docsearch`. For details, see [DocSearch plugin documentation][docsearch].

## plugins.meilisearch

Options which will be passed to `@vuepress/plugin-docsearch`. For details, see [MeiliSearch plugin documentation][meilisearch].

## plugins.slimsearch

You can set it to `true` to enable it directly, or an object to configure will be passed to `@vuepress/plugin-slimsearch`.

For details, see [SlimSearch plugin documentation][slimsearch].

## plugins.search

You can set it to `true` to enable it directly, or an object to configure will be passed to `@vuepress/plugin-search`.

For details, see [search plugin documentation][search].

[docsearch]: https://ecosystem.vuejs.press/plugins/search/docsearch.html
[meilisearch]: https://ecosystem.vuejs.press/plugins/search/meilisearch.html
[slimsearch]: https://ecosystem.vuejs.press/plugins/search/slimsearch.html
[search]: https://ecosystem.vuejs.press/plugins/search/search.html
