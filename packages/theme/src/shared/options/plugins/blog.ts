import type { BlogOptions } from "vuepress-plugin-blog2";

export interface HopeThemeBlogPluginOptions
  extends Partial<Pick<BlogOptions, "filter">> {
  /**
   * Path of article list
   *
   * 文章列表的路径
   *
   * @default '/article/'
   */
  article?: string;

  /**
   * Path of category map
   *
   * 分类地图页的地址
   *
   * @default '/category/'
   */
  category?: string;

  /**
   * Path to navigate when clicking category label
   *
   * `:name` will be automatically replaced by current category name
   *
   * 点击分类标签时跳转的路径。
   *
   * 其中 `:name` 会被自动替换为当前分类名称
   *
   * @default '/category/:name/'
   */
  categoryItem?: string;

  /**
   * Path of tag map
   *
   * 标签地图页的地址
   *
   * @default '/tag/'
   */
  tag?: string;

  /**
   * Path to navigate when clicking tag label
   *
   * `:name` will be automatically replaced by current tag name
   *
   * 点击标签跳转的路径。
   *
   * 其中 `:name` 会被自动替换为当前分类名称
   *
   * @default '/tag/:name/'
   */
  tagItem?: string;

  /**
   * Path of encrypted article list
   *
   * 加密文章列表的路径
   *
   * @default '/encrypted/'
   */
  encrypted?: string;

  /**
   * Path of slide list
   *
   * 幻灯片列表的路径
   *
   * @default '/slide/'
   */
  slide?: string;

  /**
   * Path of star article list
   *
   * 星标文章列表的路径
   *
   * @default '/star/''
   */
  star?: string;

  /**
   * Path of timeline
   *
   * 时间线路径
   *
   * @default '/timeline/'
   */
  timeline?: string;

  /**
   * Whether generate a excerpt automatically
   *
   * 是否自动生成摘要
   *
   * @default false
   */
  autoExcerpt?: boolean;
}
