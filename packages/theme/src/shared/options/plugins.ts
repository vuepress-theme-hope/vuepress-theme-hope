import type { CommentOptions } from "vuepress-plugin-comment2";
import type { CopyCodeOptions } from "vuepress-plugin-copy-code2";
import type { FeedOptions } from "vuepress-plugin-feed2";
import type { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";
import type { PhotoSwipeOptions } from "vuepress-plugin-photo-swipe";
import type { PWAOptions } from "vuepress-plugin-pwa2";
import type { SitemapOptions } from "vuepress-plugin-sitemap2";
import type { SeoOptions } from "vuepress-plugin-seo2";

export interface HopeThemePluginsOptions {
  /**
   * Enable @vuepress/plugin-active-header-links or not
   */
  activeHeaderLinks?: boolean;

  /**
   * Enable @vuepress/plugin-back-to-top or not
   */
  backToTop?: boolean;

  /**
   * 评论插件配置
   * @see http://vuepress-theme-hope.github.io/comment/zh/config/
   *
   * Comment plugin options
   * @see http://vuepress-theme-hope.github.io/comment/config/
   */
  comment?: CommentOptions;

  /**
   * 代码复制插件配置
   * @see http://vuepress-theme-hope.github.io/copy-code/zh/config/
   *
   * code copy plugin options
   * @see http://vuepress-theme-hope.github.io/copy-code/config/
   */
  copyCode?: CopyCodeOptions | false;

  /**
   * Feed 插件配置
   * @see http://vuepress-theme-hope.github.io/feed/zh/config/
   *
   * Feed plugin options
   * @see http://vuepress-theme-hope.github.io/feed/config/
   */
  feed?: FeedOptions | false;

  /**
   * Markdown 增强插件配置
   * @see http://vuepress-theme-hope.github.io/md-enhance/zh/config/
   *
   * Markdown enhance plugin options
   * @see http://vuepress-theme-hope.github.io/md-enhance/config/
   */
  mdEnhance?: MarkdownEnhanceOptions | false;

  /**
   * 图片预览插件配置
   * @see http://vuepress-theme-hope.github.io/photo-swipe/zh/config/
   *
   * Photo Swipe plugin options
   * @see http://vuepress-theme-hope.github.io/photo-swipe/config/
   */
  photoSwipe?: PhotoSwipeOptions | false;

  /**
   * PWA 插件配置
   * @see http://vuepress-theme-hope.github.io/pwa/zh/config/
   *
   * PWA plugin options
   * @see http://vuepress-theme-hope.github.io/pwa/config/
   */
  pwa?: PWAOptions | false;

  /**
   * SEO 插件配置
   * @see http://vuepress-theme-hope.github.io/seo/zh/config/
   *
   * SEO plugin options
   * @see http://vuepress-theme-hope.github.io/seo/config/
   */
  seo?: SeoOptions | false;

  /**
   * Sitemap 插件配置
   * @see http://vuepress-theme-hope.github.io/sitemap/zh/config/
   *
   * Sitemap plugin options
   * @see http://vuepress-theme-hope.github.io/sitemap/config/
   */
  sitemap?: SitemapOptions | false;

  /**
   * Enable @vuepress/plugin-container or not
   */
  container?: {
    tip?: boolean;
    warning?: boolean;
    danger?: boolean;
    details?: boolean;
    codeGroup?: boolean;
    codeGroupItem?: boolean;
  };

  /**
   * Enable @vuepress/plugin-git or not
   */
  git?: boolean;

  /**
   * Enable @vuepress/plugin-nprogress or not
   */
  nprogress?: boolean;

  /**
   * Enable @vuepress/plugin-prismjs or not
   */
  prismjs?: boolean;
}
