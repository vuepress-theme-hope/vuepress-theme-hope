import type { CommentOptions } from "vuepress-plugin-comment2";
import type { CopyCodeOptions } from "vuepress-plugin-copy-code2";
import type { FeedOptions } from "vuepress-plugin-feed2";
import type { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";
import type { PhotoSwipeOptions } from "vuepress-plugin-photo-swipe";
import type { PWAOptions } from "vuepress-plugin-pwa2";
import type { SitemapOptions } from "vuepress-plugin-sitemap2";
import type { SeoOptions } from "vuepress-plugin-seo2";
import { ReadingTimeOptions } from "packages/reading-time2/lib/shared";

export interface HopeThemePluginsOptions {
  /**
   * Enable @vuepress/plugin-active-header-links or not
   */
  activeHeaderLinks?: boolean;

  /**
   * Comment plugin options
   * @see http://vuepress-theme-hope.github.io/v2/comment/config/
   *
   * 评论插件配置
   * @see http://vuepress-theme-hope.github.io/v2/comment/zh/config/
   */
  comment?: CommentOptions | false;

  /**
   * code copy plugin options
   * @see http://vuepress-theme-hope.github.io/v2/copy-code/config/
   *
   * 代码复制插件配置
   * @see http://vuepress-theme-hope.github.io/v2/copy-code/zh/config/
   */
  copyCode?: CopyCodeOptions | false;

  /**
   * Feed plugin options
   * @see http://vuepress-theme-hope.github.io/v2/feed/config/
   *
   * Feed 插件配置
   * @see http://vuepress-theme-hope.github.io/v2/feed/zh/config/
   */
  feed?: FeedOptions | false;

  /**
   * Enable @vuepress/plugin-git or not
   */
  git?: boolean;

  /**
   * Markdown enhance plugin options
   * @see http://vuepress-theme-hope.github.io/v2/md-enhance/config/
   *
   * Markdown 增强插件配置
   * @see http://vuepress-theme-hope.github.io/v2/md-enhance/zh/config/
   */
  mdEnhance?: MarkdownEnhanceOptions | false;

  /**
   * Enable @vuepress/plugin-nprogress or not
   */
  nprogress?: boolean;

  /**
   * Photo Swipe plugin options
   * @see http://vuepress-theme-hope.github.io/v2/photo-swipe/config/
   *
   * 图片预览插件配置
   * @see http://vuepress-theme-hope.github.io/v2/photo-swipe/zh/config/
   */
  photoSwipe?: PhotoSwipeOptions | false;

  /**
   * Enable @vuepress/plugin-prismjs or not
   */
  prismjs?: boolean;

  /**
   * PWA plugin options
   * @see http://vuepress-theme-hope.github.io/v2/pwa/config/
   *
   * PWA 插件配置
   * @see http://vuepress-theme-hope.github.io/v2/pwa/zh/config/
   */
  pwa?: PWAOptions | false;

  /**
   * ReadingTime options
   * @see http://vuepress-theme-hope.github.io/v2/reading-time/
   *
   * 阅读时间插件配置
   * @see http://vuepress-theme-hope.github.io/v2/reading-time/zh/
   */
  readingTime?: ReadingTimeOptions;

  /**
   * SEO plugin options
   * @see http://vuepress-theme-hope.github.io/v2/seo/config/
   *
   * SEO 插件配置
   * @see http://vuepress-theme-hope.github.io/v2/seo/zh/config/
   */
  seo?: SeoOptions | false;

  /**
   * Sitemap plugin options
   * @see http://vuepress-theme-hope.github.io/v2/sitemap/config/
   *
   * Sitemap 插件配置
   * @see http://vuepress-theme-hope.github.io/v2/sitemap/zh/config/
   */
  sitemap?: SitemapOptions | false;
}
