import type { GitPluginOptions } from "@vuepress/plugin-git";
import type { CommentOptions } from "vuepress-plugin-comment2";
import type { ComponentOptions } from "vuepress-plugin-components";
import type { CopyCodeOptions } from "vuepress-plugin-copy-code2";
import type { CopyrightOptions } from "vuepress-plugin-copyright2";
import type { FeedOptions } from "vuepress-plugin-feed2";
import type { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";
import type { PhotoSwipeOptions } from "vuepress-plugin-photo-swipe";
import type { PWAOptions } from "vuepress-plugin-pwa2";
import type { ReadingTimeOptions } from "vuepress-plugin-reading-time2";
import type { SitemapOptions } from "vuepress-plugin-sitemap2";
import type { SeoOptions } from "vuepress-plugin-seo2";

import type { BlogPluginOptions } from "./blog.js";

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
   * @see https://vuepress-theme-hope.github.io/v2/components/config.html
   *
   * 需要启用的插件
   *
   * @description FontIcon 被内部使用，所以它无论如何都会被注册。
   *
   * @see https://vuepress-theme-hope.github.io/v2/zh/components/config.html
   *
   * @default ['Badge', 'FontIcon']
   */
  components?: ComponentOptions;

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
   * Copyright Plugin options
   *
   * @see http://vuepress-theme-hope.github.io/v2/copyright/config.html
   *
   * 代码复制插件配置
   *
   * @see http://vuepress-theme-hope.github.io/v2/copyright/zh/config.html
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
   * @see http://vuepress-theme-hope.github.io/v2/feed/config/
   *
   * Feed 插件配置
   *
   * @see http://vuepress-theme-hope.github.io/v2/feed/zh/config/
   */
  feed?: Omit<FeedOptions, "hostname">;

  /**
   * Git plugin options
   *
   * @description By default this plugin is only enabled in production mode for performance reasons.
   *
   * @see https://v2.vuepress.vuejs.org/reference/plugin/git.html
   *
   * Git 插件配置
   *
   * @description 默认情况下，出于性能原因，此插件仅在生产模式下启用。
   *
   * @see https://v2.vuepress.vuejs.org/zh/reference/plugin/git.html
   */
  git?: GitPluginOptions | boolean;

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
   *
   * @default true
   */
  nprogress?: boolean;

  /**
   * Photo Swipe plugin options
   *
   * @description This plugin is enabled by default
   *
   * @see http://vuepress-theme-hope.github.io/v2/photo-swipe/config/
   *
   * 图片预览插件配置
   *
   * @see http://vuepress-theme-hope.github.io/v2/photo-swipe/zh/config/
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
  prismjs?: boolean;

  /**
   * PWA plugin options
   *
   * @see http://vuepress-theme-hope.github.io/v2/pwa/config/
   *
   * PWA 插件配置
   *
   * @see http://vuepress-theme-hope.github.io/v2/pwa/zh/config/
   *
   * @default false
   */
  pwa?: PWAOptions | boolean;

  /**
   * ReadingTime options
   *
   * @see http://vuepress-theme-hope.github.io/v2/reading-time/
   *
   * 阅读时间插件配置
   *
   * @see http://vuepress-theme-hope.github.io/v2/reading-time/zh/
   *
   * @default true
   */
  readingTime?: ReadingTimeOptions | boolean;

  /**
   * SEO plugin options
   *
   * @see http://vuepress-theme-hope.github.io/v2/seo/config/
   *
   * SEO 插件配置
   *
   * @see http://vuepress-theme-hope.github.io/v2/seo/zh/config/
   *
   * @default true
   */
  seo?: Omit<SeoOptions, "hostname" | "author"> | boolean;

  /**
   * Sitemap plugin options
   *
   * @see http://vuepress-theme-hope.github.io/v2/sitemap/config/
   *
   * Sitemap 插件配置
   *
   * @see http://vuepress-theme-hope.github.io/v2/sitemap/zh/config/
   *
   * @default true
   */
  sitemap?: Omit<SitemapOptions, "hostname"> | boolean;
}
