import type { AuthorInfo, DateInfo } from "@mr-hope/vuepress-shared";

/**
 * Type of article infomation
 *
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
   * Category name
   *
   * 分类名称
   */
  name: string;

  /**
   * Category path
   *
   * 分类路径
   */
  path?: string;
}

export type ArticleTag = ArticleCategory;

export interface ReadingTime {
  /**
   * expect reading time
   *
   * 期望的阅读时间
   */
  minutes: number;
  /**
   * words of current page
   *
   * 当前页的字数
   */
  words: number;
}

export interface ArticleInfoProps {
  /**
   * Article Info display configuration
   *
   * @see https://vuepress-theme-hope.github.io/v2/components/guide/articleInfo/
   *
   * 文章信息配置
   *
   * @see https://vuepress-theme-hope.gitee.io/v2/components/zh/guide/articleInfo/
   *
   * @default ["Author", "Original", "PageView", "Date", "Category", "Tag", "ReadingTime"]
   */
  config?: ArticleInfo[] | false;

  /**
   * Whether enable hint popup for articleInfo
   *
   * 是否启用文章信息的弹窗提示
   *
   * @default true
   */
  hint?: boolean;

  /**
   * Whether use colorful categories and tags
   *
   * 是否启用多彩的分类与标签
   *
   * @default true
   */
  color?: boolean;

  /**
   * Authors of article
   *
   * 文章作者
   */
  author?: AuthorInfo[];

  /**
   * Categories of article
   *
   * 文章分类
   */
  category?: ArticleCategory[];

  /**
   * Tags of article
   *
   * 文章标签
   */
  tag?: ArticleTag[];

  /**
   * Writing Date
   *
   * 写作日期
   */
  date?: DateInfo | null;

  /**
   * Whether the aricle is orginal
   *
   * 文章是否原创
   */
  isOriginal?: boolean | null;

  /**
   * Whether enable pageview
   *
   * If the value is a string, it will use as search id
   *
   * 是否启用访问量
   *
   * 如果值为字符串，会用做查询 id
   */
  pageview?: string | boolean;

  /**
   * ReadingTime info
   *
   * 阅读时间
   */
  readingTime?: ReadingTime;
}
