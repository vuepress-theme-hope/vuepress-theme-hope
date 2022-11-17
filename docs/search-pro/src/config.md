---
title: Plugin Options
icon: config
---

## fullIndex

- Type: `boolean`
- Default: `false`

Whether to enable full-text indexing.

::: tip

By default the plugin will only index titles and custom fields, when set to `true` the plugin will index all contents.

:::

## hotReload

- Type: `boolean`
- Default: `false`

Whether to enable hot reload in the development server.

::: note

It is disabled by default because this feature can have a huge performance impact on sites with huge content and drastically increases the speed of hot reloads when editing Markdown.

Usually in development, users do not need to update the index database in real time.

:::

## customFields

- Type: `SearchProCustomFieldOptions[]`

  ```ts
  interface SearchProCustomFieldOptions {
    /**
     * Name of the custom field
     */
    name: string;

    /**
     * Custom field getter
     */
    getter: (page: Page) => string | string[] | null;

    /**
     * Display content
     *
     * @description `$content` will be replaced by the content returned by `getter`
     *
     * @default `$content`
     */
    formatter?: string | Record<string, string>;
  }
  ```

- Required: No

Custom search items.

::: tip Example

Assuming your theme uses category and tag tags in Frontmatter to mark categories and tags of articles, you can use the following configuration:

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
          name: "category",
          getter: (page) => page.frontmatter.category,
          formatter: {
            "/": "Category: $content",
            "/zh/": "分类：$content",
          },
        },
        {
          name: "tag",
          getter: (page) => page.frontmatter.tag,
          formatter: {
            "/": "Tag: $content",
            "/zh/": "标签：$content",
          },
        },
      ],
    }),
  ],
});
```

## locales

- Type: `SearchProLocaleConfig`

  ```ts
  /**
   * Multi language config for `vuepress-plugin-search-pro` plugin
   */
  interface SearchProLocaleData {
    /**
     * Search box placeholder text
     */
    placeholder: string;

    /**
     * Search text
     */
    search: string;

    /**
     * Close text
     */
    close: string;
  }

  interface SearchProLocaleConfig {
    [localePath: string]: SearchProLocaleData;
  }
  ```

- Required: No

Multilingual configuration of the search plugin.
