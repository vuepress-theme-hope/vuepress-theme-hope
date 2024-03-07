---
title: Config
icon: gears
---

## Plugin Options

### indexContent

- Type: `boolean`
- Default: `false`

Whether to enable content indexing.

::: tip

By default, only headings and excerpt of the page will be indexed along with your custom fields, and the content of the page will not be indexed. If you need to index the content of the page, you can set this option to `true`

:::

### autoSuggestions

- Type: `boolean`
- Default: `true`

Whether to show suggestions while searching.

### customFields

- Type: `SearchProCustomFieldOptions[]`

  ```ts
  interface SearchProCustomFieldOptions {
    /**
     * Custom field getter
     */
    getter: (page: Page) => string[] | string | null | undefined;

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

### hotKeys

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

### queryHistoryCount

- Type: `number`
- Default: `5`

Max stored query history count, set `0` to disable it.

### resultHistoryCount

- Type: `number`
- Default: `5`

Max stored matched result history count, set `0` to disable it.

### searchDelay

- Type: `number`
- Default: `150`

Delay to start searching after input.

::: note

Performing client search with huge contents could be slow, so under this case you might need to increase this value to ensure user finish input before searching.

:::

### filter

- Type: `(page: Page) => boolean`
- Default: `() => true`

Function used to filter pages.

### sortStrategy

- Type: `"max" | "total"`
- Default: `"max"`

Result Sort strategy.

When there are multiple matched results, the result will be sorted by the strategy. `max` means that page having higher total score will be placed in front. `total` means that page having higher max score will be placed in front.

### worker

- Type: `string`
- Default: `search-pro.worker.js`

Output Worker filename

### hotReload

- Type: `boolean`
- Default: Whether using `--debug` flag

Whether to enable hot reload in the development server.

::: note

It is disabled by default because this feature can have a huge performance impact on sites with huge content and drastically increases the speed of hot reloads when editing Markdown.

Usually in development, users do not need to update the index database in real time.

:::

### indexOptions

- Type: `SearchProIndexOptions`

  ```ts
  interface SearchProIndexOptions {
    /**
     * Function to tokenize the index field item.
     */
    tokenize?: (text: string, fieldName?: string) => string[];
    /**
     * Function to process or normalize terms in the index field.
     */
    processTerm?: (
      term: string,
    ) => string | string[] | null | undefined | false;
  }
  ```

- Required: No

Options used to create index.

### indexLocaleOptions

- Type: `Record<string, SearchProIndexOptions>`

  ```ts
  interface SearchProIndexOptions {
    /**
     * Function to tokenize the index field item.
     */
    tokenize?: (text: string, fieldName?: string) => string[];
    /**
     * Function to process or normalize terms in the index field.
     */
    processTerm?: (
      term: string,
    ) => string | string[] | null | undefined | false;
  }
  ```

- Required: No

Options used to create index per locale.

### locales

- Type: `SearchProLocaleConfig`

  ```ts
  /**
   * Multi language config for `vuepress-plugin-search-pro` plugin
   */
  interface SearchProLocaleData {
    /**
     * Search box placeholder
     */
    placeholder: string;

    /**
     * Search text
     */
    search: string;

    /**
     * Searching text
     */
    searching: string;

    /**
     * Cancel text
     */
    cancel: string;

    /**
     * Default title
     */
    defaultTitle: string;

    /**
     * Select hint
     */
    select: string;

    /**
     * Choose hint
     */
    navigate: string;

    /**
     * Autocomplete hint
     */
    autocomplete: string;

    /**
     * Close hint
     */
    exit: string;

    /**
     * Loading hint
     */
    loading: string;

    /**
     * Search query history title
     */
    queryHistory: string;

    /**
     * Search result history title
     */
    resultHistory: string;

    /**
     * Search history empty hint
     */
    emptyHistory: string;

    /**
     * Empty hint
     */
    emptyResult: string;
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

## Client Config

### defineSearchConfig

Customize [search options](https://mister-hope.github.io/slimsearch/interfaces/SearchOptions.html).

We also support these options internally:

```ts
interface SearchLocaleOptions
  extends Omit<
    SearchOptions,
    // These are handled internally
    | "fields"
    // These can not pass to worker
    | "filter"
    | "boostDocument"
    | "tokenize"
    | "processTerm"
  > {
  /** A function to filter suggestions */
  suggestionsFilter?: (
    suggestions: string[],
    query: string,
    locale: string,
    pageData: PageData,
  ) => string[];

  /** A function to filter search results */
  searchFilter?: (
    results: SearchResult[],
    query: string,
    locale: string,
    pageData: PageData,
  ) => SearchResult[];
}

interface SearchOptions extends SearchLocaleOptions {
  /** Setting different options per locale */
  locales?: Record<string, SearchLocaleOptions>;
}
```

```ts title=".vuepress/client.ts"
import { defineSearchConfig } from "vuepress-plugin-search-pro/client";

defineSearchConfig({
  // search options here
});

export default {};
```

### createSearchWorker

Create a search worker so that you can search through API.

```ts
type Word = [tag: string, content: string] | string;

interface TitleMatchedItem {
  type: "title";
  id: string;
  display: Word[];
}

interface HeadingMatchedItem {
  type: "heading";
  id: string;
  display: Word[];
}

interface CustomMatchedItem {
  type: "custom";
  id: string;
  index: string;
  display: Word[];
}

interface ContentMatchedItem {
  type: "content";
  id: string;
  header: string;
  display: Word[];
}

type MatchedItem =
  | TitleMatchedItem
  | HeadingMatchedItem
  | ContentMatchedItem
  | CustomMatchedItem;

interface SearchResult {
  title: string;
  contents: MatchedItem[];
}

interface SearchWorker {
  /**
   * Get both suggestions and results
   *
   * @param query - search query
   * @param localePath - locale path
   * @param options - search options
   */
  all: (
    query: string,
    localePath?: string,
    options?: SearchOptions<string, IndexItem>,
  ) => Promise<QueryResult>;

  /**
   * Get suggestions
   *
   *
   * @param query - search query
   * @param localePath - locale path
   * @param options - search options
   */
  suggest: (
    query: string,
    localePath?: string,
    options?: SearchOptions<string, IndexItem>,
  ) => Promise<string[]>;

  /**
   * Get search results
   *
   *
   * @param query - search query
   * @param localePath - locale path
   * @param options - search options
   */
  search: (
    query: string,
    localePath?: string,
    options?: SearchOptions<string, IndexItem>,
  ) => Promise<SearchResult[]>;

  /**
   * Terminate current worker
   */
  terminate: () => void;
}

const createSearchWorker: () => SearchWorker;
```
