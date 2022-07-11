import type { GitPluginOptions } from "@vuepress/plugin-git";
import type { CommentOptions } from "vuepress-plugin-comment2";
import type { CopyCodeOptions } from "vuepress-plugin-copy-code2";
import type { CopyrightOptions } from "vuepress-plugin-copyright2";
import type { FeedOptions } from "vuepress-plugin-feed2";
import type { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";
import type { PhotoSwipeOptions } from "vuepress-plugin-photo-swipe";
import type { PWAOptions } from "vuepress-plugin-pwa2";
import type { ReadingTimeOptions } from "vuepress-plugin-reading-time2";
import type { SitemapOptions } from "vuepress-plugin-sitemap2";
import type { SeoOptions } from "vuepress-plugin-seo2";
import type { HopeThemeNavbarConfig } from "./navbar";
import type { HopeThemeBlogPluginOptions } from "./options";
import type {
  HopeThemeSidebarConfig,
  HopeThemeSidebarArrayConfig,
  HopeThemeSidebarObjectConfig,
} from "./sidebar";

export type HopeThemeNavbarHelper = (
  navbarConfig: HopeThemeNavbarConfig
) => HopeThemeNavbarConfig;

export type HopeThemeSidebarHelper = (
  navbarConfig: HopeThemeSidebarConfig
) => HopeThemeSidebarConfig;

export type HopeThemeSidebarArrayHelper = (
  navbarConfig: HopeThemeSidebarArrayConfig
) => HopeThemeSidebarArrayConfig;

export type HopeThemeSidebarObjectHelper = (
  navbarConfig: HopeThemeSidebarObjectConfig
) => HopeThemeSidebarObjectConfig;

export type HopeThemeBlogPluginHelper = (
  blogConfig: HopeThemeBlogPluginOptions | boolean
) => HopeThemeBlogPluginOptions | boolean;

export type HopeThemeCommentPluginHelper = (
  commentConfig: CommentOptions | false
) => CommentOptions | false;

export type HopeThemeCopyCodePluginHelper = (
  copyCodeConfig: CopyCodeOptions | false
) => CopyCodeOptions | false;

export type HopeThemeCopyrightPluginHelper = (
  copyrightConfig: CopyrightOptions | false
) => CopyrightOptions | false;

export type HopeThemeFeedPluginHelper = (
  feedConfig: Omit<FeedOptions, "hostname"> | false
) => Omit<FeedOptions, "hostname"> | false;

export type HopeThemeGitPluginHelper = (
  gitConfig: GitPluginOptions | false
) => GitPluginOptions | false;

export type HopeThemeMdEnhancePluginHelper = (
  mdEnhanceConfig: MarkdownEnhanceOptions | false
) => MarkdownEnhanceOptions | false;

export type HopeThemePhotoSwipePluginHelper = (
  photoSwipeConfig: PhotoSwipeOptions | false
) => PhotoSwipeOptions | false;

export type HopeThemePWAPluginHelper = (
  pwaConfig: PWAOptions | false
) => PWAOptions | false;

export type HopeThemeReadingTimePluginHelper = (
  readingTimeConfig: ReadingTimeOptions | false
) => ReadingTimeOptions | false;

export type HopeThemeSEOPluginHelper = (
  seoConfig: Omit<SeoOptions, "hostname" | "author"> | false
) => Omit<SeoOptions, "hostname" | "author"> | false;

export type HopeThemeSitemapPluginHelper = (
  sitemapConfig: Omit<SitemapOptions, "hostname"> | false
) => Omit<SitemapOptions, "hostname"> | false;
