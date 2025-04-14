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
import type {
  NoticeOptions,
  NoticePluginOptions,
} from "@vuepress/plugin-notice";
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

export interface DeprecatedPluginsOptions {
  /**
   * @deprecated Use `markdown.linksCheck` instead
   */
  linksCheck?: never;

  /**
   * @deprecated Use `markdown.alert` and `markdown.hint` instead
   */
  markdownHint?: never;

  /**
   * @deprecated Use `markdown.figure` `markdown.imgLazyload` `markdown.imgMark` `markdown.imgSize` and `markdown.obsidianImgSize` instead
   */
  markdownImage?: never;

  /**
   * @deprecated Use `markdown.math` instead
   */
  markdownMath?: never;

  /**
   * @deprecated Use `markdown.codeTabs` and `markdown.tabs` instead
   */
  markdownTab?: never;

  /**
   * @deprecated Use `markdown.revealjs` instead
   */
  revealjs?: never;

  /**
   * @deprecated Use `markdown.highlighter` instead
   */
  prismjs?: never;

  /**
   * @deprecated Use `markdown.highlighter` instead
   */
  shiki?: never;

  /**
   * @deprecated Use `plugins.slimsearch` instead
   */
  searchPro?: never;

  /**
   * @deprecated Use `markdown` instead
   */
  mdEnhance?: never;
}

export interface PluginsOptions extends DeprecatedPluginsOptions {
  /**
   * Enable active-header-links plugin or not
   *
   * @see https://ecosystem.vuejs.press/plugins/development/active-header-links.html
   *
   * 是否启用 active-header-links 插件
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/development/active-header-links.html
   *
   * @default true
   */
  activeHeaderLinks?: boolean;

  /**
   * Back to top plugin options
   *
   * @see https://ecosystem.vuejs.press/plugins/features/back-to-top.html
   *
   * 返回顶部插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/features/back-to-top.html
   *
   * @default true
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
   * Components plugin options
   *
   * @see https://plugin-components.vuejs.press/config.html
   *
   * 插件选项配置
   *
   * @see https://plugin-components.vuejs.press/zh/config.html
   */
  components?: ComponentPluginOptions | false;

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
   * Copy code plugin options
   *
   * @see https://ecosystem.vuejs.press/plugins/features/copy-code.html
   *
   * 代码复制插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/features/copy-code.html
   */
  copyCode?: CopyCodePluginOptions | boolean;

  /**
   * Copyright plugin options
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
   * DocSearch plugin options
   *
   * @see https://ecosystem.vuejs.press/plugins/search/docsearch.html
   *
   * @vuepress/docsearch 选项
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/search/docsearch.html
   */
  docsearch?: DocSearchPluginOptions;

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
   * Git plugin options
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
   * Icon plugin options
   *
   * 图标插件选项
   */
  icon?: Omit<IconPluginOptions, "component">;

  /**
   * MeiliSearch plugin options
   *
   * @see https://ecosystem.vuejs.press/plugins/search/meilisearch.html
   *
   * meilisearch 插件配置
   *
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
   * photo-swipe plugin options
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
   * Reading time plugin options
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
   * Redirect plugin options
   *
   * @see https://ecosystem.vuejs.press/plugins/tools/redirect.html
   *
   * 重定向插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/tools/redirect.html
   */
  redirect?: RedirectPluginOptions | boolean;

  /**
   * Search plugin options
   *
   * @see https://ecosystem.vuejs.press/plugins/search/search.html
   *
   * @vuepress/search 插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/search/search.html
   */
  search?: SearchPluginOptions | boolean;

  /**
   * Slimsearch plugin options
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/search/slimsearch.html
   *
   * slimsearch 插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/search/slimsearch.html
   */
  slimsearch?: SlimSearchPluginOptions | boolean;

  /**
   * SEO plugin options
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
   * Sitemap plugin options
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
   * Watermark plugin options
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
