---
title: Guide
icon: lightbulb
---

`vuepress-plugin-search-pro` is a powerful client-side search plugin that can support custom indexing and full-text search.

::: danger Try not to use client-side search

You should use a service provider to provide search services for your site when possible, such as [Algolia](https://www.algolia.com/), especially for larger sites. The advantage of this is that the service provider indexes your website, and users get results through the search API when they search. Special reminder, [DocSearch](https://docsearch.algolia.com/) is a free search service provided by Algolia for open source projects. If you meet the conditions, you should try to apply for this service and use [`@vuepress/plugin-docsearch`](https://v2.vuepress.vuejs.org/reference/plugin/docsearch.html) plugin.

You should only use client search if you are **using a free hosting service with sufficient traffic**, **not meeting DocSearch requirements**, and **refusing to pay for a service provider**.

Using client-side search has the following disadvantages:

1. You need to index your website during the build stage, which increases website deployment time and website bundle size.
1. Users need to fetch the entire index database from your server before searching, which will bring additional traffic and bandwidth pressure to your server.
1. The user must wait for the search index to be downloaded and parsed locally before traversing the index to search locally, which will consume unnecessary traffic for the user, and at the same time increase the client’s unnecessary calculation and power consumption.

:::

## Simple Usage

For small sites, where you usually need a full-text search out of the box, you can call the `vuepress-plugin-search-pro` plugin directly via `{ indexContent: true }`.

## Custom Index Fields

Whether you are a theme developer or a user, it's a common operation to add extra data to a page through Frontmatter or the `extendsPage` lifecycle. In most cases, you may want to index these data as well, so we provide the `customFields` option.

`customFields` accepts an array, each element represents a custom search index configuration item. Each configuration item contains 2 parts:

- `getter`: The getter for this custom field. This function takes `page` object as a parameter and returns the value of the custom field as a string (single), an array of strings (multiple), `null` (the item is missing).
- `formatter`: a string controlling how the item is displayed in the custom search result, where `$content` is replaced with the actual value returned by `getter`. If you're using multiple languages, you can also set it as an object to set the display format for each language individually.

Is it difficult to understand? Here is a simple example.

::: tip Adding author to index

Assuming you add author information via `author` in Frontmatter:

```md
---
author: Your name
---

Markdown content...
```

You can add authors to the index by setting:

```ts
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  plugins: [
    searchProPlugin({
      customFields: [
        {
          name: "author",
          getter: (page) => page.frontmatter.author,
          formatter: "Author: $content",
        },
      ],
    }),
  ],
});
```

Simple isn't it?

:::

::: details A more complex but practical example

Suppose you are using the `@vuepress/plugin-git` plugin and you add categories and tags to your articles in Frontmatter via `category` and `tag`.

If you also put Chinese and English under `/zh/` and `/` respectively, you need to configure as follows:

```ts
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  // We assume you are using the following multilingual
  locales: {
    "/": {
      lang: "en-US",
    },
    "/zh/": {
      lang: "zh-CN",
    },
  },

  plugins: [
    searchProPlugin({
      customFields: [
        {
          getter: (page) => page.frontmatter.category,
          formatter: {
            "/": "Category: $content",
            "/zh/": "分类：$content",
          },
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: {
            "/": "Tag: $content",
            "/zh/": "标签：$content",
          },
        },
        {
          name: "updateTime",
          getter: (page) => page.data.git?.updateTime.toLocaleString(),
          formatter: {
            "/": "Update time: $content",
            "/zh/": "更新时间：$content",
          },
        },
      ],
    }),
  ],
});
```

:::

## Search Hotkeys

By default, the search hotkey is `Ctrl + K`. You can customize search hotkeys via the `hotkeys` option, see [Config → Hot Keys](./config.md#hotkeys).

## Hot Update

If you are proofreading or refining your search results, you can enable hot reloading by setting the `hotReload: true` option, see [Config → Hot Reload](./config.md#hotreload).

## Locale Customization

You can add new locale config or modify existing ones through `locales` option.

```ts
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  locales: {
    "/": {
      // this is a supported language
      lang: "en-US",
    },
    "/xx/": {
      // the plugin does not support this language
      lang: "mm-NN",
    },
  },

  plugins: [
    searchProPlugin({
      locales: {
        "/": {
          // Override placeholder
          placeholder: "Start Searching",
        },

        "/xx/": {
          // Complete locale config for `mm-NN` language here
        },
      },
    }),
  ],
});
```

For specific options, see [Config → Locale Settings](./config.md#locales).
