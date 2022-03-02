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
