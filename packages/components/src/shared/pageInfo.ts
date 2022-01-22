import type { Author, ConvertLocaleConfig } from "@mr-hope/vuepress-shared";

export interface PageInfoLocaleData {
  /**
   * Author label text
   *
   * 作者文字
   */
  author: string;

  /**
   * Writing date label text
   *
   * 写作日期文字
   */
  date: string;

  /**
   * Label text marked as original
   *
   * 标记原创的文字
   */
  origin: string;

  /**
   * Page views label text
   *
   * 访问量文字
   */
  views: string;

  /**
   * Tag label text
   *
   * 标签文字
   */
  tag: string;

  /**
   * Category label text
   *
   * 分类文字
   */
  category: string;

  /**
   * Expect reading time label text
   *
   * 期望阅读时间文字
   */
  readingTime: string;

  /**
   * Words label Text
   *
   * 文章字数
   */
  words: string;
}

export type PageInfoLocaleConfig = ConvertLocaleConfig<PageInfoLocaleData>;

/**
 * Type of page infomation
 *
 * 页面信息类型
 */
export type PageInfo =
  | "Author"
  | "Category"
  | "Date"
  | "PageView"
  | "Tag"
  | "ReadingTime"
  | "Word";

export interface PageInfoProps {
  /**
   * Default author
   *
   * 默认作者
   */
  defaultAuthor?: Author;

  /**
   * Page Info display configuration
   *
   * @see https://vuepress-theme-hope.github.io/components/guide/pageinfo/
   *
   * 文章信息配置
   *
   * @see https://vuepress-theme-hope.github.io/components/zh/guide/pageinfo/
   *
   * @default ['author', 'visitor', 'time', 'category', 'tag', 'reading-time']
   */
  items?: PageInfo[] | false;

  /**
   * Whether enable hint popup for pageinfo
   *
   * 是否启用文章信息的弹窗提示
   *
   * @default true
   */
  hint?: boolean;

  /**
   * Path to navigate when clicking category label
   *
   * `$category` will be automatically replaced by currect category name
   *
   * 点击分类标签时跳转的路径。
   *
   * 其中 `$category` 会被自动替换为当前分类名称
   */
  categoryPath?: string;

  /**
   * Path to navigate when clicking tag label
   *
   * `$tag` will be automatically replaced by currect tag name
   *
   * 点击标签跳转的路径。
   *
   * 其中 `$tag` 会被自动替换为当前分类名称
   */
  tagPath?: string;

  /**
   * Whether display icon besides title
   *
   * 是否在标题旁显示图标
   *
   * @default false
   */

  titleIcon?: boolean;

  /**
   * Title icon prefix
   *
   * 标题图标 class 前缀
   */
  titleIconPrefix?: string;
}
