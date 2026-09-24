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

The theme adds built-in support for the following 5 plugins:

- @vuepress/plugin-docsearch
- @vuepress/plugin-meilisearch
- @vuepress/plugin-slimsearch
- @vuepress/plugin-orama
- @vuepress/plugin-search

::: important

You need to install the plugin that you want manually.

Only 1 of the 5 search plugins can be enabled at the same time, and the priority is `docsearch` > `meilisearch` > `slimsearch` > `orama` > `search`.

:::

::: tip Recommendation

`slimsearch` and `orama` both provide client-side search. `slimsearch` is recommended, as it ships a much smaller index and worker bundle. Pick `orama` only when you prefer its stricter `AND` matching or plan to use the Orama ecosystem.

:::

## plugins.docsearch

Options which will be passed to `@vuepress/plugin-docsearch`. For details, see [DocSearch plugin documentation][docsearch].

## plugins.meilisearch

Options which will be passed to `@vuepress/plugin-meilisearch`. For details, see [MeiliSearch plugin documentation][meilisearch].

## plugins.slimsearch

You can set it to `true` to enable it directly, or an object to configure will be passed to `@vuepress/plugin-slimsearch`.

For details, see [SlimSearch plugin documentation][slimsearch].

## plugins.orama

You can set it to `true` to enable it directly, or an object to configure will be passed to `@vuepress/plugin-orama`.

For details, see [Orama plugin documentation][orama].

## plugins.search

You can set it to `true` to enable it directly, or an object to configure will be passed to `@vuepress/plugin-search`.

For details, see [search plugin documentation][search].

[docsearch]: https://ecosystem.vuejs.press/plugins/search/docsearch.html
[meilisearch]: https://ecosystem.vuejs.press/plugins/search/meilisearch.html
[orama]: https://ecosystem.vuejs.press/plugins/search/orama.html
[slimsearch]: https://ecosystem.vuejs.press/plugins/search/slimsearch.html
[search]: https://ecosystem.vuejs.press/plugins/search/search.html
