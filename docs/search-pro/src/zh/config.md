---
title: 配置
icon: gears
---

## 插件选项

### indexContent

- 类型: `boolean`
- 默认值: `false`

是否索引内容。

::: tip

默认情况下，插件只会索引页面的标题和摘要以及你的自定义索引项，不会索引页面的正文内容。如果需要索引页面的正文内容，可以将该选项设置为 `true`。

:::

### autoSuggestions

- 类型: `boolean`
- 默认值: `false`

是否自动提示搜索建议。

### customFields

- 类型: `SearchProCustomFieldOptions[]`

  ```ts
  interface SearchProCustomFieldOptions {
    /**
     * 自定义项目的获取器
     */
    getter: (page: Page) => string[] | string | null | undefined;

    /**
     * 展示的内容
     *
     * @description `$content` 会被 `getter` 返回的内容替换
     *
     * @default `$content`
     */
    formatter?: string | Record<string, string>;
  }
  ```

- 必填: 否

自定义搜索项目。

::: tip 例子

假如你的主题在 Frontmatter 中使用 category 和 tag 标记文章的分类和标签，你可以使用以下配置：

```ts
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  // 我们假定你在使用如下多语言
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

- 类型: `SearchProHotKeyOptions[]`

  ```ts
  interface SearchProHotKeyOptions {
    /**
     * 热键的 `event.key` 值
     */
    key: string;

    /**
     * 是否同时按下 `event.altKey`
     *
     * @default false
     */
    alt?: boolean;

    /**
     * 是否同时按下 `event.ctrlKey`
     *
     * @default false
     */
    ctrl?: boolean;

    /**
     * 是否同时按下 `event.shiftKey`
     *
     * @default false
     */
    shift?: boolean;

    /**
     * 是否同时按下 `event.metaKey`
     *
     * @default false
     */
    meta?: boolean;
  }
  ```

- 默认值: `[{ key: "k", ctrl: true }, { key: "/", ctrl: true }]`

指定热键的 [event.key](http://keycode.info/)。

当热键被按下时，搜索框的输入框会被聚焦，设置为空数组以禁用热键。

### queryHistoryCount

- 类型: `number`
- 默认值: `5`

存储搜索查询词历史的最大数量，可以设置为 `0` 以禁用。

### resultHistoryCount

- 类型: `number`
- 默认值: `5`

存储搜索结果历史的最大数量，可以设置为 `0` 以禁用。

### searchDelay

- 类型: `number`
- 默认值: `150`

结束输入到开始搜索的延时

::: note

有大量内容时，进行客户端搜素可能会很慢，在这种情况下你可能需要增加此值来确保开始搜索时用户已完成输入。

:::

### filter

- 类型: `(page: Page) => boolean`
- 默认值: `() => true`

用于过滤页面的函数。

### sortStrategy

- 类型: `"max" | "total"`
- 默认值: `"max"`

结果排序策略

当有多个匹配的结果时，会按照策略对结果进行排序。`max` 表示最高分更高的页面会排在前面。`total` 表示总分更高的页面会排在前面。

### worker

- 类型: `string`
- 默认值: `search-pro.worker.js`

输出的 Worker 文件名称

### hotReload

- 类型: `boolean`
- 默认值: 是否使用 `--debug` 标记

是否在开发服务器中启用实时热重载。

::: note

它是默认禁用的，因为此功能会对内容巨大的站点产生极大性能影响，并且在编辑 Markdown 时剧烈增加热重载的速度。

通常情况下，在开发中，用户并不需要实时更新索引数据库。

:::

### indexOptions

- 类型: `SearchProIndexOptions`

  ```ts
  interface SearchProIndexOptions {
    /**
     * 用于对索引字段项进行分词的函数。
     */
    tokenize?: (text: string, fieldName?: string) => string[];
    /**
     * 用于处理或规范索引字段中的术语的函数。
     */
    processTerm?: (
      term: string,
    ) => string | string[] | null | undefined | false;
  }
  ```

- 必填: 否

创建索引选项。

### indexLocaleOptions

- 类型: `Record<string, SearchProIndexOptions>`

  ```ts
  interface SearchProIndexOptions {
    /**
     * 用于对索引字段项进行分词的函数。
     */
    tokenize?: (text: string, fieldName?: string) => string[];
    /**
     * 用于处理或规范索引字段中的术语的函数。
     */
    processTerm?: (
      term: string,
    ) => string | string[] | null | undefined | false;
  }
  ```

- 必填: 否

分语言的创建索引选项。

### locales

- 类型: `SearchProLocaleConfig`

  ```ts
  /**
   * `vuepress-plugin-search-pro` 插件的多语言配置
   */
  interface SearchProLocaleData {
    /**
     * 搜索框占位符文字
     */
    placeholder: string;

    /**
     * 搜素文字
     */
    search: string;

    /**
     * 搜素中文字
     */
    searching: string;

    /**
     * 取消文字
     */
    cancel: string;

    /**
     * 默认标题
     */
    defaultTitle: string;

    /**
     * 选择提示
     */
    select: string;

    /**
     * 选择提示
     */
    navigate: string;

    /**
     * 自动补全提示
     */
    autocomplete: string;

    /**
     * 关闭提示
     */
    exit: string;

    /**
     * 加载提示
     */
    loading: string;

    /**
     * 搜索文字历史 标题
     */
    queryHistory: string;

    /**
     * 搜索结果历史 标题
     */
    resultHistory: string;

    /**
     * 无搜索历史提示
     */
    emptyHistory: string;

    /**
     * 无结果提示
     */
    emptyResult: string;
  }

  interface SearchProLocaleConfig {
    [localePath: string]: SearchProLocaleData;
  }
  ```

- 必填: 否

搜索插件的多语言配置。

## 客户端配置

### defineSearchConfig

自定义 [搜索选项](https://mister-hope.github.io/slimsearch/interfaces/SearchOptions.html)。

我们还额外支持以下选项：

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
  /** 一个过滤建议的函数 */
  suggestionsFilter?: (
    suggestions: string[],
    query: string,
    locale: string,
    pageData: PageData,
  ) => string[];

  /** 一个过滤搜素结果的函数 */
  searchFilter?: (
    results: SearchResult[],
    query: string,
    locale: string,
    pageData: PageData,
  ) => SearchResult[];

  /** 分词器 */
  splitWord?: (query: string) => Promise<string[]>;
}

interface SearchOptions extends SearchLocaleOptions {
  /** 基于每个语言来设置选项 */
  locales?: Record<string, SearchLocaleOptions>;
}
```

```ts title=".vuepress/client.ts"
import { defineSearchConfig } from "vuepress-plugin-search-pro/client";

defineSearchConfig({
  // 此处放置搜索选项
});

export default {};
```

### createSearchWorker

创建一个搜索 Worker 以便你可以通过 API 搜索。

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
   * 同时获取建议和结果
   *
   * @param query - 搜素词
   * @param localePath - 语言路径
   * @param options - 搜素选项
   */
  all: (
    query: string,
    localePath?: string,
    options?: SearchOptions<string, IndexItem>,
  ) => Promise<QueryResult>;

  /**
   * 获取建议
   *
   * @param query - 搜素词
   * @param localePath - 语言路径
   * @param options - 搜素选项
   */
  suggest: (
    query: string,
    localePath?: string,
    options?: SearchOptions<string, IndexItem>,
  ) => Promise<string[]>;

  /**
   * 获取搜索结果
   *
   * @param query - 搜素词
   * @param localePath - 语言路径
   * @param options - 搜素选项
   */
  search: (
    query: string,
    localePath?: string,
    options?: SearchOptions<string, IndexItem>,
  ) => Promise<SearchResult[]>;

  /**
   * 终止当前 worker
   */
  terminate: () => void;
}

const createSearchWorker: () => SearchWorker;
```
