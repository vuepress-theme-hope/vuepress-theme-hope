---
title: Article information
icon: info
---

## Props

```ts
export interface ArticleInfoProps {
  /**
   * Article Info display configuration
   *
   * @default ["Author", "Original", "PageView", "Date", "Category", "Tag", "ReadingTime"]
   */
  config?: ArticleInfo[] | false;

  /**
   * Whether enable hint popup for articleInfo
   *
   * @default true
   */
  hint?: boolean;

  /**
   * Authors of article
   */
  author?: AuthorInfo[];

  /**
   * Categories of article
   */
  category?: ArticleCategory[];

  /**
   * Tags of article
   */
  tag?: ArticleTag[];

  /**
   * Writing Date
   */
  date?: DateInfo | null;

  /**
   * Whether the aricle is orginal
   */
  isOriginal?: boolean | null;

  /**
   * Whether enable pageview
   *
   * If the value is a string, it will use as search id
   */
  visitor?: string | boolean;

  /**
   * ReadingTime info
   */
  readingTime?: ReadingTime;
}

/**
 * Type of article infomation
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
   * Category name
   */
  name: string;

  /**
   * Category Path
   */
  path?: string;
}

export type ArticleTag = ArticleCategory;

interface ReadingTime {
  /**
   * expect reading time
   */
  minutes: number;
  /**
   * words of current page
   */
  words: number;
}
```
