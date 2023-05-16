---
title: Guide
icon: lightbulb
---

`vuepress-plugin-search-pro` is a powerful client-side search plugin that can support custom indexing and full-text search.

::: warning Avoid using client-side search

Although client-side search does not require a backend and is easy to add to documents and blogs, for large sites it has a fatal disadvantage. Searching using the client means:

1. You need to index your website during the build stage, which increases website deployment time and website bundle size.
1. Users need to fetch the entire index database from your server before searching, which will bring additional traffic and bandwidth pressure to your server.
1. The user must wait for the search index to be downloaded and parsed locally before traversing the index to search locally, which will consume unnecessary traffic for the user, and at the same time increase the client's unnecessary calculation and power consumption.

So you should choose a service provider to provide search services for your site if possible, such as [Algolia](https://www.algolia.com/), or choose an open source search crawler tool and host it on your own server to provide a search service and regularly craw your site. This is necessary for large sites because users send search terms to the search API via network requests and get search results directly.

In particular, [DocSearch](https://docsearch.algolia.com/) is a free search service provided by Algolia for open source projects. If you are creating open source project documentation or an open source technical blog, you can [apply for it](https://docsearch.algolia.com/apply/), and use [`@vuepress/plugin-docsearch`](https://vuejs.press/reference/plugin/docsearch.html) plugin to provide search features.

You should use client-side search only when you **do not meet the applying requirements for DocSearch** and **are not willing to pay for service providers**, **can not set up your own search service**.

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

Simple, isn't it?

:::

::: details A more complex but practical example

Suppose you are using the `@vuepress/plugin-git` plugin, and you add categories and tags to your articles in Frontmatter via `category` and `tag`.

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

By default, the search hotkey are `Ctrl + K` and `Ctrl + /`. You can customize search hotkeys via the `hotkeys` option, see [Config → Hot Keys](./config.md#hotkeys).

## Limitations in DevServer

The search service is powered by a worker, and in dev mode we cannot bundle the work file.

In order to load search indexes in dev mode, we are using a modern service worker with `type: "module"`, however currently this feature is only supported by Chrome, and not available in Firefox and Safari. So if you want to try searching in devServer, you should use Chrome, see [CanIUse](https://caniuse.com/mdn-api_worker_worker_options_type_parameter) for support details.

For better performance, adding/editing/deleting markdown contents will not trigger update for search index in dev mode. If you are proofreading or refining your search results, you can enable hot reloading by setting the `hotReload: true` option, see [Config → Hot Reload](./config.md#hotreload).

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
