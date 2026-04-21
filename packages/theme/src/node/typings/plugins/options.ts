import type { BackToTopPluginOptions } from "@vuepress/plugin-back-to-top";
import type { CatalogPluginOptions } from "@vuepress/plugin-catalog";
import type { CommentPluginOptions } from "@vuepress/plugin-comment";
import type { CopyCodePluginOptions } from "@vuepress/plugin-copy-code";
import type { CopyrightPluginOptions } from "@vuepress/plugin-copyright";
import type { DocSearchPluginOptions } from "@vuepress/plugin-docsearch";
import type { FeedPluginOptions } from "@vuepress/plugin-feed";
import type { GitPluginOptions } from "@vuepress/plugin-git";
import type { IconPluginOptions } from "@vuepress/plugin-icon";
import type { MeiliSearchPluginOptions } from "@vuepress/plugin-meilisearch";
import type { NoticeOptions, NoticePluginOptions } from "@vuepress/plugin-notice";
import type { PhotoSwipePluginOptions } from "@vuepress/plugin-photo-swipe";
import type { PwaPluginOptions } from "@vuepress/plugin-pwa";
import type { ReadingTimePluginOptions } from "@vuepress/plugin-reading-time";
import type { RedirectPluginOptions } from "@vuepress/plugin-redirect";
import type { SearchPluginOptions } from "@vuepress/plugin-search";
import type { SeoPluginOptions } from "@vuepress/plugin-seo";
import type { SitemapPluginOptions } from "@vuepress/plugin-sitemap";
import type { SlimSearchPluginOptions } from "@vuepress/plugin-slimsearch";
import type { WatermarkPluginOptions } from "@vuepress/plugin-watermark";
import type { ComponentPluginOptions } from "vuepress-plugin-components";

import type { BlogOptions } from "./blog.js";

export interface DeprecatedThemePluginsOptions {
  /** @deprecated Use `markdown.linksCheck` instead */
  linksCheck?: never;

  /** @deprecated Use `markdown.alert` and `markdown.hint` instead */
  markdownHint?: never;

  /**
   * @deprecated Use `markdown.figure` `markdown.imgLazyload` `markdown.imgMark` `markdown.imgSize`
   *   and `markdown.obsidianImgSize` instead
   */
  markdownImage?: never;

  /** @deprecated Use `markdown.math` instead */
  markdownMath?: never;

  /** @deprecated Use `markdown.codeTabs` and `markdown.tabs` instead */
  markdownTab?: never;

  /** @deprecated Use `markdown.revealjs` instead */
  revealjs?: never;

  /** @deprecated Use `markdown.highlighter` instead */
  prismjs?: never;

  /** @deprecated Use `markdown.highlighter` instead */
  shiki?: never;

  /** @deprecated Use `plugins.slimsearch` instead */
  searchPro?: never;

  /** @deprecated Use `markdown` instead */
  mdEnhance?: never;
}

export interface ThemePluginsOptions extends DeprecatedThemePluginsOptions {
  /**
   * Enable active-header-links plugin or not
   *
   * 是否启用 active-header-links 插件
   *
   * @default true
   * @see https://ecosystem.vuejs.press/plugins/development/active-header-links.html
   * @see https://ecosystem.vuejs.press/zh/plugins/development/active-header-links.html
   */
  activeHeaderLinks?: boolean;

  /**
   * Back to top plugin options
   *
   * 返回顶部插件配置
   *
   * @default true
   * @see https://ecosystem.vuejs.press/plugins/features/back-to-top.html
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
   * Catalog plugin options
   *
   * 自动目录插件选项
   *
   * @default true
   * @see https://ecosystem.vuejs.press/plugins/features/catalog.html
   * @see https://ecosystem.vuejs.press/plugins/features/catalog.html
   */
  catalog?: CatalogPluginOptions | boolean;

  /**
   * Components plugin options
   *
   * 插件选项配置
   *
   * @see https://plugin-components.vuejs.press/config.html
   * @see https://plugin-components.vuejs.press/zh/config.html
   */
  components?: ComponentPluginOptions | false;

  /**
   * Comment plugin options
   *
   * 评论插件配置
   *
   * @see https://ecosystem.vuejs.press/plugins/blog/comment/
   * @see https://ecosystem.vuejs.press/zh/plugins/blog/comment/
   */
  comment?: CommentPluginOptions | false;

  /**
   * Copy code plugin options
   *
   * 代码复制插件配置
   *
   * @see https://ecosystem.vuejs.press/plugins/features/copy-code.html
   * @see https://ecosystem.vuejs.press/zh/plugins/features/copy-code.html
   */
  copyCode?: CopyCodePluginOptions | boolean;

  /**
   * Copyright plugin options
   *
   * 版权信息插件配置
   *
   * @default false
   * @see https://ecosystem.vuejs.press/plugins/features/copyright.html
   * @see https://ecosystem.vuejs.press/zh/plugins/features/copyright.html
   */
  copyright?: CopyrightPluginOptions | boolean;

  /**
   * DocSearch plugin options
   *
   * DocSearch 插件选项
   *
   * @see https://ecosystem.vuejs.press/plugins/search/docsearch.html
   * @see https://ecosystem.vuejs.press/zh/plugins/search/docsearch.html
   */
  docsearch?: DocSearchPluginOptions;

  /**
   * Feed plugin options
   *
   * Feed 插件配置
   *
   * @see https://ecosystem.vuejs.press/plugins/blog/feed/config.html
   * @see https://ecosystem.vuejs.press/zh/plugins/blog/feed/config.html
   */
  feed?: Omit<FeedPluginOptions, "hostname"> | boolean;

  /**
   * Git plugin options
   *
   * By default this plugin is only enabled in production mode for performance reasons.
   *
   * Git 插件配置
   *
   * 默认情况下，出于性能原因，此插件仅在生产模式下启用。
   *
   * @see https://ecosystem.vuejs.press/plugins/development/git.html
   * @see https://ecosystem.vuejs.press/zh/plugins/development/git.html
   */
  git?: GitPluginOptions | boolean;

  /**
   * Icon plugin options
   *
   * 图标插件选项
   */
  icon?: Omit<IconPluginOptions, "component"> | boolean;

  /**
   * MeiliSearch plugin options
   *
   * Meilisearch 插件配置
   *
   * @see https://ecosystem.vuejs.press/plugins/search/meilisearch.html
   * @see https://ecosystem.vuejs.press/zh/plugins/search/meilisearch.html
   */
  meilisearch?: MeiliSearchPluginOptions;

  /**
   * Notice options
   *
   * 公告选项
   *
   * @default true
   */
  notice?: NoticeOptions[] | NoticePluginOptions;

  /**
   * Enable nprogress plugin or not
   *
   * 是否启用 nprogress 插件
   *
   * @default true
   */
  nprogress?: boolean;

  /**
   * Photo-swipe plugin options
   *
   * 图片预览插件配置
   *
   * @default true
   * @see https://ecosystem.vuejs.press/plugins/features/photo-swipe.html
   * @see https://ecosystem.vuejs.press/zh/plugins/features/photo-swipe.html
   */
  photoSwipe?: PhotoSwipePluginOptions | boolean;

  /**
   * PWA plugin options
   *
   * PWA 插件配置
   *
   * @default false
   * @see https://ecosystem.vuejs.press/plugins/pwa/pwa/config.html
   * @see https://ecosystem.vuejs.press/zh/plugins/pwa/pwa/config.html
   */
  pwa?: PwaPluginOptions | boolean;

  /**
   * Reading time plugin options
   *
   * 阅读时间插件配置
   *
   * @default true
   * @see https://ecosystem.vuejs.press/plugins/development/reading-time.html
   * @see https://ecosystem.vuejs.press/zh/plugins/development/reading-time.html
   */
  readingTime?: ReadingTimePluginOptions | boolean;

  /**
   * Redirect plugin options
   *
   * 重定向插件配置
   *
   * @see https://ecosystem.vuejs.press/plugins/tools/redirect.html
   * @see https://ecosystem.vuejs.press/zh/plugins/tools/redirect.html
   */
  redirect?: RedirectPluginOptions | boolean;

  /**
   * Search plugin options
   *
   * Search 插件配置
   *
   * @deprecated Use `slimsearch` instead
   * @deprecated 使用 `slimsearch` 代替
   * @see https://ecosystem.vuejs.press/plugins/search/search.html
   * @see https://ecosystem.vuejs.press/zh/plugins/search/search.html
   */
  search?: SearchPluginOptions | boolean;

  /**
   * Slimsearch plugin options
   *
   * Slimsearch 插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/search/slimsearch.html
   * @see https://ecosystem.vuejs.press/zh/plugins/search/slimsearch.html
   */
  slimsearch?: SlimSearchPluginOptions | boolean;

  /**
   * SEO plugin options
   *
   * SEO 插件配置
   *
   * @default true
   * @see https://ecosystem.vuejs.press/plugins/seo/seo/config.html
   * @see https://ecosystem.vuejs.press/zh/plugins/seo/seo/config.html
   */
  seo?: Omit<SeoPluginOptions, "hostname" | "author"> | boolean;

  /**
   * Sitemap plugin options
   *
   * Sitemap 插件配置
   *
   * @default true
   * @see https://ecosystem.vuejs.press/plugins/seo/sitemap/config.html
   * @see https://ecosystem.vuejs.press/zh/plugins/seo/sitemap/config.html
   */
  sitemap?: Omit<SitemapPluginOptions, "hostname"> | boolean;

  /**
   * Watermark plugin options
   *
   * 水印插件配置
   *
   * @default false
   * @see https://ecosystem.vuejs.press/plugins/features/watermark.html
   * @see https://ecosystem.vuejs.press/zh/plugins/features/watermark.html
   */
  watermark?: WatermarkPluginOptions | boolean;
}
