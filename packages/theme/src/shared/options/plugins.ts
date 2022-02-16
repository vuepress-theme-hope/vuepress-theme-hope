import type { BlogOptions } from "vuepress-plugin-blog2";
import type { CommentOptions } from "vuepress-plugin-comment2";
import type { CopyCodeOptions } from "vuepress-plugin-copy-code2";
import type { FeedOptions } from "vuepress-plugin-feed2";
import type { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";
import type { PhotoSwipeOptions } from "vuepress-plugin-photo-swipe";
import type { PWAOptions } from "vuepress-plugin-pwa2";
import type { ReadingTimeOptions } from "vuepress-plugin-reading-time2";
import type { SitemapOptions } from "vuepress-plugin-sitemap2";
import type { SeoOptions } from "vuepress-plugin-seo2";

export interface HopeThemeBlogPluginOptions
  extends Pick<BlogOptions, "filter"> {
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
   * `:name` will be automatically replaced by currect category name
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
   * `:name` will be automatically replaced by currect tag name
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
  slides?: string;

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

export interface HopeThemePluginsOptions {
  /**
   * Enable @vuepress/active-header-links or not
   *
   * 是否启用 @vuepress/active-header-links 插件
   */
  activeHeaderLinks?: boolean;

  /**
   * Blog plugin options
   *
   * 博客插件选项
   *
   * @default false
   */
  blog?: HopeThemeBlogPluginOptions | boolean;

  /**
   * Comment plugin options
   *
   * @see http://vuepress-theme-hope.github.io/v2/comment/config/
   *
   * 评论插件配置
   *
   * @see http://vuepress-theme-hope.github.io/v2/comment/zh/config/
   */
  comment?: CommentOptions | false;

  /**
   * code copy plugin options
   *
   * @see http://vuepress-theme-hope.github.io/v2/copy-code/config/
   *
   * 代码复制插件配置
   *
   * @see http://vuepress-theme-hope.github.io/v2/copy-code/zh/config/
   */
  copyCode?: CopyCodeOptions | false;

  /**
   * Enable @vuepress/external-link-icon or not
   *
   * 是否启用 @vuepress/external-link-icon 插件
   */
  externalLinkIcon?: boolean;

  /**
   * Feed plugin options
   *
   * @see http://vuepress-theme-hope.github.io/v2/feed/config/
   *
   * Feed 插件配置
   *
   * @see http://vuepress-theme-hope.github.io/v2/feed/zh/config/
   */
  feed?: Omit<FeedOptions, "hostname"> | false;

  /**
   * md-enhance plugin options
   *
   * @see http://vuepress-theme-hope.github.io/v2/md-enhance/config/
   *
   * md-enhance 插件配置
   *
   * @see http://vuepress-theme-hope.github.io/v2/md-enhance/zh/config/
   */
  mdEnhance?: MarkdownEnhanceOptions | false;

  /**
   * Enable @vuepress/nprogress or not
   *
   * 是否启用 @vuepress/nprogress 插件
   */
  nprogress?: boolean;

  /**
   * Photo Swipe plugin options
   *
   * @see http://vuepress-theme-hope.github.io/v2/photo-swipe/config/
   *
   * 图片预览插件配置
   *
   * @see http://vuepress-theme-hope.github.io/v2/photo-swipe/zh/config/
   */
  photoSwipe?: PhotoSwipeOptions | false;

  /**
   * Enable @vuepress/prismjs or not
   *
   * 是否启用 @vuepress/prismjs 插件
   */
  prismjs?: boolean;

  /**
   * PWA plugin options
   *
   * @see http://vuepress-theme-hope.github.io/v2/pwa/config/
   *
   * PWA 插件配置
   *
   * @see http://vuepress-theme-hope.github.io/v2/pwa/zh/config/
   */
  pwa?: PWAOptions | false;

  /**
   * ReadingTime options
   *
   * @see http://vuepress-theme-hope.github.io/v2/reading-time/
   *
   * 阅读时间插件配置
   *
   * @see http://vuepress-theme-hope.github.io/v2/reading-time/zh/
   */
  readingTime?: ReadingTimeOptions;

  /**
   * SEO plugin options
   *
   * @see http://vuepress-theme-hope.github.io/v2/seo/config/
   *
   * SEO 插件配置
   *
   * @see http://vuepress-theme-hope.github.io/v2/seo/zh/config/
   */
  seo?: Omit<SeoOptions, "hostname" | "author"> | false;

  /**
   * Sitemap plugin options
   *
   * @see http://vuepress-theme-hope.github.io/v2/sitemap/config/
   *
   * Sitemap 插件配置
   *
   * @see http://vuepress-theme-hope.github.io/v2/sitemap/zh/config/
   */
  sitemap?: Omit<SitemapOptions, "hostname"> | false;
}
