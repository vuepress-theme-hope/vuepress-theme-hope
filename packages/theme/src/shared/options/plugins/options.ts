import type { GitPluginOptions } from "@vuepress/plugin-git";
import type { AutoCatalogOptions } from "vuepress-plugin-auto-catalog";
import type { CommentPluginOptions } from "vuepress-plugin-comment2";
import type { ComponentOptions } from "vuepress-plugin-components";
import type { CopyCodeOptions } from "vuepress-plugin-copy-code2";
import type { CopyrightOptions } from "vuepress-plugin-copyright2";
import type { FeedOptions } from "vuepress-plugin-feed2";
import type { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";
import type { PhotoSwipeOptions } from "vuepress-plugin-photo-swipe";
import type { PWAOptions } from "vuepress-plugin-pwa2";
import type { ReadingTimeOptions } from "vuepress-plugin-reading-time2";
import type { SeoOptions } from "vuepress-plugin-seo2";
import type { SitemapOptions } from "vuepress-plugin-sitemap2";

import type { BlogPluginOptions } from "./blog.js";
import type { PrismjsOptions } from "./prism.js";

export interface PluginsOptions {
  /**
   * Enable @vuepress/active-header-links or not
   *
   * 是否启用 @vuepress/active-header-links 插件
   *
   * @default true
   */
  activeHeaderLinks?: boolean;

  /**
   * Auto catalog plugin Options
   *
   * 自动目录插件选项
   *
   * @default true
   */
  autoCatalog?: AutoCatalogOptions | boolean;

  /**
   * Blog plugin options
   *
   * 博客插件选项
   *
   * @default false
   */
  blog?: BlogPluginOptions | boolean;

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
   * code copy plugin options
   *
   * @see https://plugin-copy-code2.vuejs.press/config/
   *
   * 代码复制插件配置
   *
   * @see https://plugin-copy-code2.vuejs.press/zh/config/
   */
  copyCode?: CopyCodeOptions | false;

  /**
   * Copyright Plugin options
   *
   * @see https://plugin-copyright2.vuejs.press/config.html
   *
   * 版权信息插件配置
   *
   * @see https://plugin-copyright2.vuejs.press/zh/config.html
   *
   * @default false
   */
  copyright?: CopyrightOptions | boolean;

  /**
   * Enable @vuepress/external-link-icon or not
   *
   * 是否启用 @vuepress/external-link-icon 插件
   *
   * @default true
   */
  externalLinkIcon?: boolean;

  /**
   * Feed plugin options
   *
   * @see https://plugin-feed2.vuejs.press/config/
   *
   * Feed 插件配置
   *
   * @see https://plugin-feed2.vuejs.press/zh/config/
   */
  feed?: Omit<FeedOptions, "hostname">;

  /**
   * Git plugin options
   *
   * @description By default this plugin is only enabled in production mode for performance reasons.
   *
   * @see https://vuejs.press/reference/plugin/git.html
   *
   * Git 插件配置
   *
   * @description 默认情况下，出于性能原因，此插件仅在生产模式下启用。
   *
   * @see https://vuejs.press/zh/reference/plugin/git.html
   */
  git?: GitPluginOptions | boolean;

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
    | (Omit<MarkdownEnhanceOptions, "container"> & {
        /**
         * Whether to enable custom container including
         *
         * - info
         * - note
         * - tip
         * - warning
         * - caution
         * - details
         *
         * ⚠ The last 4 items conflict with default theme and will override it’s style.
         *
         * 是否启用自定义容器
         *
         * - info
         * - note
         * - tip
         * - warning
         * - caution
         * - details
         *
         * ⚠ 最后四个会和默认主题冲突，且会覆盖默认主题的样式与行为。
         *
         * @default true
         */
        container?: boolean;
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
   * @see https://plugin-photo-swipe.vuejs.press/config/
   *
   * 图片预览插件配置
   *
   * @see https://plugin-photo-swipe.vuejs.press/zh/config/
   *
   * @default true
   */
  photoSwipe?: PhotoSwipeOptions | boolean;

  /**
   * Enable @vuepress/prismjs or not
   *
   * 是否启用 @vuepress/prismjs 插件
   *
   * @default true
   */
  prismjs?: PrismjsOptions | boolean;

  /**
   * PWA plugin options
   *
   * @see https://plugin-pwa2.vuejs.press/config/
   *
   * PWA 插件配置
   *
   * @see https://plugin-pwa2.vuejs.press/zh/config/
   *
   * @default false
   */
  pwa?: PWAOptions | boolean;

  /**
   * ReadingTime options
   *
   * @see https://plugin-reading-time2.vuejs.press/
   *
   * 阅读时间插件配置
   *
   * @see https://plugin-reading-time2.vuejs.press/zh/
   *
   * @default true
   */
  readingTime?: ReadingTimeOptions | boolean;

  /**
   * SEO plugin options
   *
   * @see https://plugin-seo2.vuejs.press/config/
   *
   * SEO 插件配置
   *
   * @see https://plugin-seo2.vuejs.press/zh/config/
   *
   * @default true
   */
  seo?: Omit<SeoOptions, "hostname" | "author"> | boolean;

  /**
   * Sitemap plugin options
   *
   * @see https://plugin-sitemap2.vuejs.press/config/
   *
   * Sitemap 插件配置
   *
   * @see https://plugin-sitemap2.vuejs.press/zh/config/
   *
   * @default true
   */
  sitemap?: Omit<SitemapOptions, "hostname"> | boolean;
}
