---
title: Plugin Options
icon: gears
---

## indexContent

- Type: `boolean`
- Default: `false`

Whether to enable content indexing.

::: tip

By default, only headings and excerpt of the page will be indexed along with your custom fields, and the content of the page will not be indexed. If you need to index the content of the page, you can set this option to `true`

:::

## customFields

- Type: `SearchProCustomFieldOptions[]`

  ```ts
  interface SearchProCustomFieldOptions {
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
      ],
    }),
  ],
});
```

:::

## hotKeys

- Type: `SearchProHotKeyOptions[]`

  ```ts
  interface SearchProHotKeyOptions {
    /**
     * Value of `event.key` to trigger the hot key
     */
    key: string;

    /**
     * Whether to press `event.altKey` at the same time
     *
     * @default false
     */
    alt?: boolean;

    /**
     * Whether to press `event.ctrlKey` at the same time
     *
     * @default false
     */
    ctrl?: boolean;

    /**
     * Whether to press `event.shiftKey` at the same time
     *
     * @default false
     */
    shift?: boolean;

    /**
     * Whether to press `event.metaKey` at the same time
     *
     * @default false
     */
    meta?: boolean;
  }
  ```

- Default: `[{ key: "k", ctrl: true }, { key: "/", ctrl: true }]`

Specify the [event.key](http://keycode.info/) of the hotkeys.

When hotkeys are pressed, the search box input will be focused. Set to an empty array to disable hotkeys.

## queryHistoryCount

- Type: `number`
- Default: `5`

Max stored query history count, set `0` to disable it.

## resultHistoryCount

- Type: `number`
- Default: `5`

Max stored matched result history count, set `0` to disable it.

## delay

- Type: `number`
- Default: `300`

Delay to start searching after input.

::: note

Performing client search with huge contents could be slow, so under this case you might need to increase this value to ensure user finish input before searching.

:::

## worker

- Type: `string`
- Default: `search-pro.worker.js`

Output Worker filename

## hotReload

- Type: `boolean`
- Default: Whether using `--debug` flag

Whether to enable hot reload in the development server.

::: note

It is disabled by default because this feature can have a huge performance impact on sites with huge content and drastically increases the speed of hot reloads when editing Markdown.

Usually in development, users do not need to update the index database in real time.

:::

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

    /**
     * Select hint
     */
    select: string;

    /**
     * Choose hint
     */
    navigate: string;

    /**
     * Close hint
     */
    exit: string;

    /**
     * Loading hint
     */
    loading: string;

    /**
     * Empty hint
     */
    empty: string;
  }

  interface SearchProLocaleConfig {
    [localePath: string]: SearchProLocaleData;
  }
  ```

- Required: No

Multilingual configuration of the search plugin.

::: details Built-in Supported Languages

- **Simplified Chinese** (zh-CN)
- **Traditional Chinese** (zh-TW)
- **English (United States)** (en-US)
- **German** (de-DE)
- **German (Australia)** (de-AT)
- **Russian** (ru-RU)
- **Ukrainian** (uk-UA)
- **Vietnamese** (vi-VN)
- **Portuguese (Brazil)** (pt-BR)
- **Polish** (pl-PL)
- **French** (fr-FR)
- **Spanish** (es-ES)
- **Slovak** (sk-SK)
- **Japanese** (ja-JP)
- **Turkish** (tr-TR)
- **Korean** (ko-KR)
- **Finnish** (fi-FI)
- **Indonesian** (id-ID)
- **Dutch** (nl-NL)

:::
