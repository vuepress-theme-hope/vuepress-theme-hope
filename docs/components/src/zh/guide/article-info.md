---
title: 文章信息
icon: info
---

## Props

```ts
export interface ArticleInfoProps {
  /**
   * 文章信息配置
   *
   * @default ["Author", "Original", "PageView", "Date", "Category", "Tag", "ReadingTime"]
   */
  config?: ArticleInfo[] | false;

  /**
   * 是否启用文章信息的弹窗提示
   *
   * @default true
   */
  hint?: boolean;

  /**
   * 文章作者
   */
  author?: AuthorInfo[];

  /**
   * 文章分类
   */
  category?: ArticleCategory[];

  /**
   * 文章标签
   */
  tag?: ArticleTag[];

  /**
   * 写作日期
   */
  date?: DateInfo | null;

  /**
   * 文章是否原创
   */
  isOriginal?: boolean | null;

  /**
   * 是否启用访问量
   *
   * 如果值为字符串，会用做查询 id
   */
  visitor?: string | boolean;

  /**
   * 阅读时间
   */
  readingTime?: ReadingTime;
}

/**
 * 文章信息类型
 */
export type ArticleInfo =
  | "Author"
  | "Category"
  | "Date"
  | "Original"
  | "PageView"
  | "Tag"
  | "ReadingTime"
  | "Word";

export interface ArticleCategory {
  /**
   * 分类名称
   */
  name: string;

  /**
   * 分类路径
   */
  path?: string;
}

export type ArticleTag = ArticleCategory;

interface ReadingTime {
  /**
   * 期望的阅读时间
   */
  minutes: number;
  /**
   * 当前页的字数
   */
  words: number;
}
```

<!--
### config

`config` 接受一个字符串数组，填入所展示的文章信息名称，填入的顺序即是各信息显示的顺序。

文章信息可选值和对应信息如下:

| 可选值           | 对应信息     | 页面 frontmatter 属性      |
| ---------------- | ------------ | -------------------------- |
| `'author'`       | 作者         | `author`                   |
| `'time'`         | 写作日期     | `time`                     |
| `'category'`     | 分类         | `category`                 |
| `'tag'`          | 标签         | `tag`                      |
| `'reading-time'` | 预计阅读时间 | N/A (自动生成)             |
| `'word'`         | 字数         | N/A (自动生成)             |
| `'visitor'`      | 访问量       | `visitor` (仅 Valine 可用) |

默认会显示 “作者，访问量，写作日期，分类，标签，预计阅读时间”。

::: tip 其他说明

- **author**

  你可以通过插件选项中的 `author` 来设置默认作者，同样，你仍可以在页面 frontmatter 设置 `author` 来覆盖默认作者，或者设置为 `false` 以取消该页面的作者显示。

- **time**

  建议以标准格式输入日期，即 `xxxx-xx-xx` 的形式。(例: “2020 年 4 月 1 日” 应输入为 `2020-04-01`)

- **reading-time**

  默认的阅读速度是每分钟 300 字，你可以在插件选项中设置 `wordPerMinute` 来覆盖它。

:::

## 原创标识

你可以在页面 frontmatter 中设置 `isOriginal` 为 `true` 来为你的文章添加原创标签。 -->
