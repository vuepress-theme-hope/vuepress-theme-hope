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
    getter: (page: Page) => string | string[] | null;

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

### delay

- 类型: `number`
- 默认值: `150`

结束输入到开始搜索的延时

::: note

有大量内容时，进行客户端搜素可能会很慢，在这种情况下你可能需要增加此值来确保开始搜索时用户已完成输入。

:::

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

## indexOptions

- 类型: `SearchProIndexOptions`

  ```ts
  export interface SearchProIndexOptions {
    /**
     * 用于对索引字段项进行分词的函数。
     */
    tokenize?: (text: string, fieldName?: string) => string[];
    /**
     * 用于处理或规范索引字段中的术语的函数。
     */
    processTerm?: (
      term: string
    ) => string | string[] | null | undefined | false;
  }
  ```

- 必填: 否

创建索引选项。

## indexLocaleOptions

- 类型: `Record<string, SearchProIndexOptions>`

  ```ts
  export interface SearchProIndexOptions {
    /**
     * 用于对索引字段项进行分词的函数。
     */
    tokenize?: (text: string, fieldName?: string) => string[];
    /**
     * 用于处理或规范索引字段中的术语的函数。
     */
    processTerm?: (
      term: string
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
     * 关闭文字
     */
    close: string;

    /**
     * 选择提示
     */
    select: string;

    /**
     * 选择提示
     */
    navigate: string;

    /**
     * 关闭提示
     */
    exit: string;

    /**
     * 加载提示
     */
    loading: string;

    /**
     * 无结果提示
     */
    empty: string;
  }

  interface SearchProLocaleConfig {
    [localePath: string]: SearchProLocaleData;
  }
  ```

- 必填: 否

搜索插件的多语言配置。

## 客户端配置

### defineSearchConfig

自定义 [搜索选项](https://mister-hope.github.io/slimsearch/types/SearchOptions.html)。

```ts
// .vuepress/client.ts
import { defineSearchConfig } from "vuepress-plugin-search-pro/client";

defineSearchConfig({
  // 此处放置搜索选项
});

export default {};
```

### createSearchWorker

创建一个搜索 Worker 以便你可以通过 API 搜索。

```ts
export type Word = [tag: string, content: string] | string;

export interface TitleMatchedItem {
  type: "title";
  id: string;
  display: Word[];
}

export interface HeadingMatchedItem {
  type: "heading";
  id: string;
  display: Word[];
}

export interface CustomMatchedItem {
  type: "custom";
  id: string;
  index: string;
  display: Word[];
}

export interface ContentMatchedItem {
  type: "content";
  id: string;
  header: string;
  display: Word[];
}

export type MatchedItem =
  | TitleMatchedItem
  | HeadingMatchedItem
  | ContentMatchedItem
  | CustomMatchedItem;

export interface SearchResult {
  title: string;
  contents: MatchedItem[];
}

export interface SearchWorker {
  search: (
    query: string,
    locale: string,
    searchOptions?: SearchOptions
  ) => Promise<SearchResult[]>;
  terminate: () => void;
}

declare const createSearchWorker: (
  options: SearchWorkerOptions
) => SearchWorker;
```
