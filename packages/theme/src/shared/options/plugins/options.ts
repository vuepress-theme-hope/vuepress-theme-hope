import type { BackToTopPluginOptions } from "@vuepress/plugin-back-to-top";
import type { CatalogPluginOptions } from "@vuepress/plugin-catalog";
import type { CopyCodePluginOptions } from "@vuepress/plugin-copy-code";
import type { CopyrightPluginOptions } from "@vuepress/plugin-copyright";
import type { DocsearchPluginOptions } from "@vuepress/plugin-docsearch";
import type { FeedPluginOptions } from "@vuepress/plugin-feed";
import type { GitPluginOptions } from "@vuepress/plugin-git";
import type { LinksCheckPluginOptions } from "@vuepress/plugin-links-check";
import type { PhotoSwipePluginOptions } from "@vuepress/plugin-photo-swipe";
import type { PwaPluginOptions } from "@vuepress/plugin-pwa";
import type { ReadingTimePluginOptions } from "@vuepress/plugin-reading-time";
import type { RedirectPluginOptions } from "@vuepress/plugin-redirect";
import type { SearchPluginOptions } from "@vuepress/plugin-search";
import type { SeoPluginOptions } from "@vuepress/plugin-seo";
import type { SitemapPluginOptions } from "@vuepress/plugin-sitemap";
import type { CommentPluginOptions } from "vuepress-plugin-comment2";
import type { ComponentOptions } from "vuepress-plugin-components";
import type { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";
import type { SearchProOptions } from "vuepress-plugin-search-pro";

import type { BlogOptions } from "./blog.js";
import type { PrismjsOptions } from "./prism.js";

export interface PluginsOptions {
  /**
   * Enable @vuepress/active-header-links or not
   *
   * @see https://ecosystem.vuejs.press/plugins/active-header-links.html
   *
   * 是否启用 @vuepress/active-header-links 插件
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/active-header-links.html
   *
   * @default true
   */
  activeHeaderLinks?: boolean;

  /**
   * Options for @vuepress/back-to-top
   *
   * @see https://ecosystem.vuejs.press/plugins/back-to-top.html
   *
   * 返回顶部插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/back-to-top.html
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
   * @see https://ecosystem.vuejs.press/plugins/catalog.html
   *
   * 自动目录插件选项
   *
   * @see https://ecosystem.vuejs.press/plugins/catalog.html
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
  components?: ComponentOptions;

  /**
   * Comment plugin options
   *
   * @see https://plugin-comment2.vuejs.press/config/
   *
   * 评论插件配置
   *
   * @see https://plugin-comment2.vuejs.press/zh/config/
   */
  comment?: CommentPluginOptions | false;

  /**
   * Options for @vuepress/copy-code
   *
   * @see https://ecosystem.vuejs.press/plugins/copy-code.html
   *
   * 代码复制插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/copy-code.html
   */
  copyCode?: CopyCodePluginOptions | boolean;

  /**
   * Options for @vuepress/copyright
   *
   * @see https://ecosystem.vuejs.press/plugins/copyright.html
   *
   * 版权信息插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/copyright.html
   *
   * @default false
   */
  copyright?: CopyrightPluginOptions | boolean;

  /**
   * Options for @vuepress/docsearch
   *
   * @see https://ecosystem.vuejs.press/plugins/docsearch.html
   *
   * @vuepress/docsearch 选项
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/docsearch.html
   */
  docsearch?: DocsearchPluginOptions;

  /**
   * Enable @vuepress/external-link-icon or not
   *
   * @see https://ecosystem.vuejs.press/plugins/external-link-icon.html
   *
   * 是否启用 @vuepress/external-link-icon 插件
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/external-link-icon.html
   *
   * @default true
   */
  externalLinkIcon?: boolean;

  /**
   * Feed plugin options
   *
   * @see https://ecosystem.vuejs.press/plugins/feed/config.html
   *
   * Feed 插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/feed/config.html
   */
  feed?: Omit<FeedPluginOptions, "hostname"> | boolean;

  /**
   * Options for @vuepress/git
   *
   * @description By default this plugin is only enabled in production mode for performance reasons.
   *
   * @see https://ecosystem.vuejs.press/plugins/git.html
   *
   * Git 插件配置
   *
   * @description 默认情况下，出于性能原因，此插件仅在生产模式下启用。
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/git.html
   */
  git?: GitPluginOptions | boolean;

  /**
   * Options for @vuepress/links-check
   *
   * @see https://ecosystem.vuejs.press/plugins/links-check.html
   *
   * @vuepress/links-check 插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/links-check.html
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
    | (Omit<MarkdownEnhanceOptions, "hint"> & {
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
   * Enable @vuepress/nprogress or not
   *
   * 是否启用 @vuepress/nprogress 插件
   *
   * @default true
   */
  nprogress?: boolean;

  /**
   * Photo Swipe plugin options
   *
   * @description This plugin is enabled by default
   *
   * @see https://ecosystem.vuejs.press/plugins/photo-swipe.html
   *
   * 图片预览插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/photo-swipe.html
   *
   * @default true
   */
  photoSwipe?: PhotoSwipePluginOptions | boolean;

  /**
   * Enable @vuepress/prismjs or not
   *
   * @see https://ecosystem.vuejs.press/plugins/prismjs.html
   *
   * 是否启用 @vuepress/prismjs 插件
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/prismjs.html
   *
   * @default true
   */
  prismjs?: PrismjsOptions | boolean;

  /**
   * PWA plugin options
   *
   * @see https://ecosystem.vuejs.press/plugins/pwa/config.html
   *
   * PWA 插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/pwa/config.html
   *
   * @default false
   */
  pwa?: PwaPluginOptions | boolean;

  /**
   * ReadingTime options
   *
   * @see https://ecosystem.vuejs.press/plugins/reading-time.html
   *
   * 阅读时间插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/reading-time.html
   *
   * @default true
   */
  readingTime?: ReadingTimePluginOptions | boolean;

  /**
   * Redirect options
   *
   * @see https://ecosystem.vuejs.press/plugins/redirect.html
   *
   * 重定向插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/redirect.html
   */
  redirect?: RedirectPluginOptions | boolean;

  /**
   * @vuepress/search plugin options
   *
   * @see https://ecosystem.vuejs.press/plugins/search.html
   *
   * @vuepress/search 插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/search.html
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
  searchPro?: SearchProOptions | boolean;

  /**
   * Options for @vuepress/seo
   *
   * @see https://ecosystem.vuejs.press/plugins/seo/config.html
   *
   * SEO 插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/seo/config.html
   *
   * @default true
   */
  seo?: Omit<SeoPluginOptions, "hostname" | "author"> | boolean;

  /**
   * Options for @vuepress/sitemap
   *
   * @see https://ecosystem.vuejs.press/plugins/sitemap/config.html
   *
   * Sitemap 插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/sitemap/config.html
   *
   * @default true
   */
  sitemap?: Omit<SitemapPluginOptions, "hostname"> | boolean;
}
