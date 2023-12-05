---
title: Guide
icon: lightbulb
---

`vuepress-plugin-search-pro` is a powerful client-side search plugin that can support custom indexing and full-text search.

## Get Started

### Index Range

By default, the plugin will only index headings, article excerpt and custom fields you add. If you want to index all content, you should set `indexContent: true` in the plugin options.

::: warning

When indexing languages that is not word based, like Chinese, Japanese or Korean, you should set `indexOptions` and `indexLocaleOptions` to perform correct word-splitting, see [Customize Index Generation](#customize-index-generation).

:::

### Ultra Fast

With [`slimsearch`](https://mister-hope.github.io/slimsearch/), searching with `vuepress-plugin-search-pro` is ultra fast, even on large sites.

### Highlighting and Context

The plugin highlights keywords in search results and displays context around them.

### Auto Suggestions

The plugin will show related words as suggestions when you type in the search box by default. If you don't need this behavior, please set `autoSuggestions: false`.

### Query and Search History

The plugin will display 5 last query you type and 5 last search result you choose at startup.

This behavior can be changed by setting `queryHistoryCount` and `resultHistoryCount` option, which you can disable them by setting `0`.

### Full Keyboard Support

The plugin supports keyboard navigation out of box, where you can:

- use hotkey to activate the search box
- use `↑` and `↓` to navigate through search results and auto suggestions
- use `Tab` to apply suggestions
- use `Enter` to open the selected result
- use `Esc` to close suggestions list or the search box

By default, the search hotkey are `Ctrl + K` and `Ctrl + /`. You can customize search hotkeys via the `hotkeys` option, see [Config → Hot Keys](./config.md#hotkeys).

## Custom Fields

Whether you are a theme developer or a user, it's a common operation to add extra data to a page through Frontmatter or the `extendsPage` lifecycle. In most cases, you may want to index these data as well, so here is `customFields` option.

`customFields` accepts an array, each element represents a custom search index configuration item. Each configuration item contains 2 parts:

- `getter`: The getter for this custom field. This function takes `page` object as a parameter and returns the value of the custom field as a string (single), an array of strings (multiple), `null` (the item is missing).
- `formatter`: a string controlling how the item is displayed in the custom search result, where `$content` is replaced with the actual value returned by `getter`. If you're using multiple languages, you can also set it as an object to set the display format for each language individually.

These data will be added to indexes and the search result will contain them.

Difficult to understand? Here is an example.

::: info Adding author to index

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

## Advanced

### Customize Index Generation

If you are indexing other language which is not using "Words", like Chinese, Japanese or Korean, you should set `indexOptions` and `indexLocaleOptions` to perform correct word-splitting.

If you are building a Chinese docs, you can use [nodejs-jieba](https://github.com/Mister-Hope/nodejs-jieba) to perform word splitting. (Japanese and Korean do not have built-in dictionary, but you can provide your own dictionary and split words with `nodejs-jieba`).

If your docs only contain Chinese, you can tokenize the content like this:

```ts
import { cut } from "nodejs-jieba";
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  lang: "zh-CN",

  plugins: [
    searchProPlugin({
      // index all content
      indexContent: true,
      indexOptions: {
        // tokenize the content with nodejs-jieba
        tokenize: (text, fieldName) =>
          fieldName === "id" ? [text] : cut(text, true),
      },
    }),
  ],
});
```

If you need word splitting in some locales, you can set `indexLocaleOptions`:

```ts
import { cut } from "nodejs-jieba";
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
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
      indexContent: true,
      indexLocaleOptions: {
        "/zh/": {
          // tokenize the content with nodejs-jieba
          tokenize: (text, fieldName) =>
            fieldName === "id" ? [text] : cut(text, true),
        },
      },
    }),
  ],
});
```

### Customize Search Options

You can customize search options by importing and calling `defineSearchConfig` in client config file:

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { defineSearchConfig } from "vuepress-plugin-search-pro/client";

defineSearchConfig({
  // search options here
});

export default defineClientConfig({
  // ...
});
```

::: note

Since searching is done in a Web Worker, setting options to function-typed value is not supported.

:::

### Using with API

If you want to use the search API, you need to import the `createSearchWorker` function from `vuepress-plugin-search-pro/client`:

```ts
import { defineClientConfig } from "@vuepress/client";
import { createSearchWorker } from "vuepress-plugin-search-pro/client";

const { search, terminate } = createSearchWorker();

// use search API
search("keyword").then((results) => {
  // use search results
});

// terminate the worker when you don't need it
terminate();
```

### Limitations in DevServer

The search service is powered by a worker, and in dev mode we cannot bundle the worker file.

In order to load search indexes in dev mode, we are using a modern service worker with `type: "module"`, however currently this feature is not available in Firefox and Safari. So if you want to try searching in devServer, you should use a supported browser, see [CanIUse](https://caniuse.com/mdn-api_worker_worker_options_type_parameter) for support details.

For better performance, adding/editing/deleting markdown contents will not trigger update for search index in dev mode. If you are proofreading or refining your search results, you can enable hot reloading by setting the `hotReload: true` option, see [Config → Hot Reload](./config.md#hotreload).

### Comparing with Server-Search

Client-side search has advantages, like no backend services and easy to add, but you should be aware that it has disadvantages.

::: warning Disadvantages

1. You need to index your website during the build stage, which increases website deployment time and website bundle size.
1. Users need to fetch the entire search index from your server before searching, which will bring additional traffic and bandwidth pressure to your server. The more content you hold on your site, the larger search index will be.
1. To perform a search, users must wait for the search index to be downloaded and parsed locally. This may be much slower than performing a simple web request to get results via Server-search.
1. Since searching is done on users devices, the speed is totally based on device performance.

:::

In most cases, if you are building a large site, you should choose a service provider to provide search services for your site if possible, such as [Algolia](https://www.algolia.com/), or choose an open source search crawler tool and host it on your own server to provide a search service and regularly craw your site. This is necessary for large sites because users send search terms to the search API via network requests and get search results directly.

In particular, [DocSearch](https://docsearch.algolia.com/) is a free search service provided by Algolia for open source projects. If you are creating open source project documentation or an open source technical blog, you can [apply for it](https://docsearch.algolia.com/apply/), and use [`@vuepress/plugin-docsearch`](https://vuejs.press/reference/plugin/docsearch.html) plugin to provide search features.
