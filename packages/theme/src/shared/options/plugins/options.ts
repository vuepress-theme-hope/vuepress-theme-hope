import type { BackToTopPluginOptions } from "@vuepress/plugin-back-to-top";
import type { CatalogPluginOptions } from "@vuepress/plugin-catalog";
import type { CommentPluginOptions } from "@vuepress/plugin-comment";
import type { CopyCodePluginOptions } from "@vuepress/plugin-copy-code";
import type { CopyrightPluginOptions } from "@vuepress/plugin-copyright";
import type { DocsearchPluginOptions } from "@vuepress/plugin-docsearch";
import type { FeedPluginOptions } from "@vuepress/plugin-feed";
import type { GitPluginOptions } from "@vuepress/plugin-git";
import type { LinksCheckPluginOptions } from "@vuepress/plugin-links-check";
import type {
  NoticeOptions,
  NoticePluginOptions,
} from "@vuepress/plugin-notice";
import type { PhotoSwipePluginOptions } from "@vuepress/plugin-photo-swipe";
import type { PrismjsPluginOptions } from "@vuepress/plugin-prismjs";
import type { PwaPluginOptions } from "@vuepress/plugin-pwa";
import type { ReadingTimePluginOptions } from "@vuepress/plugin-reading-time";
import type { RedirectPluginOptions } from "@vuepress/plugin-redirect";
import type { SearchPluginOptions } from "@vuepress/plugin-search";
import type { SeoPluginOptions } from "@vuepress/plugin-seo";
import type { ShikiPluginOptions } from "@vuepress/plugin-shiki";
import type { SitemapPluginOptions } from "@vuepress/plugin-sitemap";
import type { WatermarkPluginOptions } from "@vuepress/plugin-watermark";
import type { ComponentPluginOptions } from "vuepress-plugin-components";
import type { MarkdownEnhancePluginOptions } from "vuepress-plugin-md-enhance";
import type { SearchProPluginOptions } from "vuepress-plugin-search-pro";

import type { BlogOptions } from "./blog.js";

export interface PluginsOptions {
  /**
   * Enable @vuepress/active-header-links or not
   *
   * @see https://ecosystem.vuejs.press/plugins/development/active-header-links.html
   *
   * 是否启用 @vuepress/active-header-links 插件
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/development/active-header-links.html
   *
   * @default true
   */
  activeHeaderLinks?: boolean;

  /**
   * Options for @vuepress/back-to-top
   *
   * @see https://ecosystem.vuejs.press/plugins/features/back-to-top.html
   *
   * 返回顶部插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/features/back-to-top.html
   */
  backToTop?: BackToTopPluginOptions | boolean;

  /**
   * Blog plugin options
   *
   * 博客插件选项
   *
   * @default false
   */
  blog?: BlogOptions | boolean;

  /**
   * Options for @vuepress/catalog
   *
   * @see https://ecosystem.vuejs.press/plugins/features/catalog.html
   *
   * 自动目录插件选项
   *
   * @see https://ecosystem.vuejs.press/plugins/features/catalog.html
   *
   * @default true
   */
  catalog?: CatalogPluginOptions | boolean;

  /**
   * Components enabled
   *
   * @description FontIcon is used internally, so it will be registered anyway.
   *
   * @see https://plugin-components.vuejs.press/config.html
   *
   * 需要启用的插件
   *
   * @description FontIcon 被内部使用，所以它无论如何都会被注册。
   *
   * @see https://plugin-components.vuejs.press/zh/config.html
   */
  components?: ComponentPluginOptions;

  /**
   * Comment plugin options
   *
   * @see https://ecosystem.vuejs.press/plugins/blog/comment/
   *
   * 评论插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/blog/comment/
   */
  comment?: CommentPluginOptions | false;

  /**
   * Options for @vuepress/copy-code
   *
   * @see https://ecosystem.vuejs.press/plugins/features/copy-code.html
   *
   * 代码复制插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/features/copy-code.html
   */
  copyCode?: CopyCodePluginOptions | boolean;

  /**
   * Options for @vuepress/copyright
   *
   * @see https://ecosystem.vuejs.press/plugins/features/copyright.html
   *
   * 版权信息插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/features/copyright.html
   *
   * @default false
   */
  copyright?: CopyrightPluginOptions | boolean;

  /**
   * Options for @vuepress/docsearch
   *
   * @see https://ecosystem.vuejs.press/plugins/search/docsearch.html
   *
   * @vuepress/docsearch 选项
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/search/docsearch.html
   */
  docsearch?: DocsearchPluginOptions;

  /**
   * Feed plugin options
   *
   * @see https://ecosystem.vuejs.press/plugins/blog/feed/config.html
   *
   * Feed 插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/blog/feed/config.html
   */
  feed?: Omit<FeedPluginOptions, "hostname"> | boolean;

  /**
   * Options for @vuepress/git
   *
   * @description By default this plugin is only enabled in production mode for performance reasons.
   *
   * @see https://ecosystem.vuejs.press/plugins/development/git.html
   *
   * Git 插件配置
   *
   * @description 默认情况下，出于性能原因，此插件仅在生产模式下启用。
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/development/git.html
   */
  git?: GitPluginOptions | boolean;

  /**
   * Options for @vuepress/links-check
   *
   * @see https://ecosystem.vuejs.press/plugins/markdown/links-check.html
   *
   * @vuepress/links-check 插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/markdown/links-check.html
   */
  linksCheck?: LinksCheckPluginOptions | boolean;

  /**
   * md-enhance plugin options
   *
   * @see https://plugin-md-enhance.vuejs.press/config/
   *
   * md-enhance 插件配置
   *
   * @see https://plugin-md-enhance.vuejs.press/zh/config/
   */
  mdEnhance?:
    | (Omit<MarkdownEnhancePluginOptions, "hint"> & {
        /**
         * Whether to enable hint container including
         *
         * - important
         * - info
         * - note
         * - tip
         * - warning
         * - caution
         * - details
         *
         * 是否启用提示容器
         *
         * - important
         * - info
         * - note
         * - tip
         * - warning
         * - caution
         * - details
         *
         * @default true
         */
        hint?: boolean;
      })
    | false;

  /**
   * Notice options
   *
   * 公告选项
   *
   * @default true
   */
  notice?: NoticeOptions[] | NoticePluginOptions;

  /**
   * Enable @vuepress/nprogress or not
   *
   * 是否启用 @vuepress/nprogress 插件
   *
   * @default true
   */
  nprogress?: boolean;

  /**
   * @vuepress/photo-swipe options
   *
   * @description This plugin is enabled by default
   *
   * @see https://ecosystem.vuejs.press/plugins/features/photo-swipe.html
   *
   * 图片预览插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/features/photo-swipe.html
   *
   * @default true
   */
  photoSwipe?: PhotoSwipePluginOptions | boolean;

  /**
   * Enable @vuepress/prismjs or not
   *
   * @see https://ecosystem.vuejs.press/plugins/markdown/prismjs.html
   *
   * 是否启用 @vuepress/prismjs 插件
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/markdown/prismjs.html
   *
   * @default false
   */
  prismjs?: PrismjsPluginOptions | boolean;

  /**
   * PWA plugin options
   *
   * @see https://ecosystem.vuejs.press/plugins/pwa/pwa/config.html
   *
   * PWA 插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/pwa/pwa/config.html
   *
   * @default false
   */
  pwa?: PwaPluginOptions | boolean;

  /**
   * ReadingTime options
   *
   * @see https://ecosystem.vuejs.press/plugins/development/reading-time.html
   *
   * 阅读时间插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/development/reading-time.html
   *
   * @default true
   */
  readingTime?: ReadingTimePluginOptions | boolean;

  /**
   * Redirect options
   *
   * @see https://ecosystem.vuejs.press/plugins/tools/redirect.html
   *
   * 重定向插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/tools/redirect.html
   */
  redirect?: RedirectPluginOptions | boolean;

  /**
   * @vuepress/search plugin options
   *
   * @see https://ecosystem.vuejs.press/plugins/search/search.html
   *
   * @vuepress/search 插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/search/search.html
   */
  search?: SearchPluginOptions | boolean;

  /**
   * search-pro plugin options
   *
   * @see https://plugin-search-pro.vuejs.press/config/
   *
   * search-pro 插件配置
   *
   * @see https://plugin-search-pro.vuejs.press/zh/config/
   */
  searchPro?: SearchProPluginOptions | boolean;

  /**
   * Options for @vuepress/seo
   *
   * @see https://ecosystem.vuejs.press/plugins/seo/seo/config.html
   *
   * SEO 插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/seo/seo/config.html
   *
   * @default true
   */
  seo?: Omit<SeoPluginOptions, "hostname" | "author"> | boolean;

  /**
   * Enable @vuepress/shiki or not
   *
   * @see https://ecosystem.vuejs.press/plugins/markdown/shiki.html
   *
   * 是否启用 @vuepress/shiki 插件
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/markdown/shiki.html
   *
   * @default true
   */
  shiki?: ShikiPluginOptions | boolean;

  /**
   * Options for @vuepress/sitemap
   *
   * @see https://ecosystem.vuejs.press/plugins/seo/sitemap/config.html
   *
   * Sitemap 插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/seo/sitemap/config.html
   *
   * @default true
   */
  sitemap?: Omit<SitemapPluginOptions, "hostname"> | boolean;

  /**
   * Options for @vuepress/watermark
   *
   * @see https://ecosystem.vuejs.press/plugins/features/watermark.html
   *
   * 水印插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/features/watermark.html
   *
   * @default false
   */
  watermark?: WatermarkPluginOptions | boolean;
}
