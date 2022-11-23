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
import type {
  BlogPluginOptions,
  NavbarOptions,
  SidebarOptions,
  SidebarArrayOptions,
  SidebarObjectOptions,
} from "../../shared/index.js";

type Helper<T> = (options: T) => T;

export type HopeThemeNavbarHelper = Helper<NavbarOptions>;

export type HopeThemeSidebarHelper = Helper<SidebarOptions>;

export type HopeThemeSidebarArrayHelper = Helper<SidebarArrayOptions>;

export type HopeThemeSidebarObjectHelper = Helper<SidebarObjectOptions>;

export type HopeThemeBlogPluginHelper = Helper<BlogPluginOptions | boolean>;

export type HopeThemeCommentPluginHelper = Helper<CommentOptions | false>;

export type HopeThemeCopyCodePluginHelper = Helper<CopyCodeOptions | false>;

export type HopeThemeCopyrightPluginHelper = Helper<CopyrightOptions | false>;

export type HopeThemeFeedPluginHelper = Helper<
  Omit<FeedOptions, "hostname"> | false
>;

export type HopeThemeGitPluginHelper = Helper<GitPluginOptions | false>;
export type HopeThemeMdEnhancePluginHelper = Helper<
  MarkdownEnhanceOptions | false
>;

export type HopeThemePhotoSwipePluginHelper = Helper<PhotoSwipeOptions | false>;

export type HopeThemePWAPluginHelper = Helper<PWAOptions | false>;

export type HopeThemeReadingTimePluginHelper = Helper<
  ReadingTimeOptions | false
>;

export type HopeThemeSEOPluginHelper = Helper<
  Omit<SeoOptions, "hostname" | "author"> | false
>;

export type HopeThemeSitemapPluginHelper = Helper<
  Omit<SitemapOptions, "hostname"> | false
>;
