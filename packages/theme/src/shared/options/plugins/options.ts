import type { GitPluginOptions } from "@vuepress/plugin-git";
import type { CommentOptions } from "vuepress-plugin-comment2";
import type { AvailableComponent } from "vuepress-plugin-components";
import type { CopyCodeOptions } from "vuepress-plugin-copy-code2";
import type { CopyrightOptions } from "vuepress-plugin-copyright2";
import type { FeedOptions } from "vuepress-plugin-feed2";
import type { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";
import type { PhotoSwipeOptions } from "vuepress-plugin-photo-swipe";
import type { PWAOptions } from "vuepress-plugin-pwa2";
import type { ReadingTimeOptions } from "vuepress-plugin-reading-time2";
import type { SitemapOptions } from "vuepress-plugin-sitemap2";
import type { SeoOptions } from "vuepress-plugin-seo2";

import type { HopeThemeBlogPluginOptions } from "./blog.js";

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
   * @default ['Badge']
   */
  components?: Exclude<AvailableComponent, "FontIcon">[];

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
   */
  copyright?: CopyrightOptions | true;

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
   * Git plugin options
   *
   * @see https://v2.vuepress.vuejs.org/reference/plugin/git.html#install
   *
   * Git 插件配置
   *
   * @see https://v2.vuepress.vuejs.org/zh/reference/plugin/git.html#install
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
  pwa?: PWAOptions | boolean;

  /**
   * ReadingTime options
   *
   * @see http://vuepress-theme-hope.github.io/v2/reading-time/
   *
   * 阅读时间插件配置
   *
   * @see http://vuepress-theme-hope.github.io/v2/reading-time/zh/
   */
  readingTime?: ReadingTimeOptions | false;

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
