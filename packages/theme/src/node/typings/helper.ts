import type { GitPluginOptions } from "@vuepress/plugin-git";
import type { CommentOptions } from "vuepress-plugin-comment2";
import type { CopyCodeOptions } from "vuepress-plugin-copy-code2";
import type { CopyrightOptions } from "vuepress-plugin-copyright2";
import type { FeedOptions } from "vuepress-plugin-feed2";
import type { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";
import type { PhotoSwipeOptions } from "vuepress-plugin-photo-swipe";
import type { PWAOptions } from "vuepress-plugin-pwa2";
import type { ReadingTimeOptions } from "vuepress-plugin-reading-time2";
import type { SeoOptions } from "vuepress-plugin-seo2";
import type { SitemapOptions } from "vuepress-plugin-sitemap2";

import type {
  BlogPluginOptions,
  NavbarOptions,
  SidebarArrayOptions,
  SidebarObjectOptions,
  SidebarOptions,
} from "../../shared/index.js";

type Helper<T> = (options: T) => T;

export type ThemeNavbarHelper = Helper<NavbarOptions>;

export type ThemeSidebarHelper = Helper<SidebarOptions>;

export type ThemeSidebarArrayHelper = Helper<SidebarArrayOptions>;

export type ThemeSidebarObjectHelper = Helper<SidebarObjectOptions>;

export type ThemeBlogPluginHelper = Helper<BlogPluginOptions | boolean>;

export type ThemeCommentPluginHelper = Helper<CommentOptions | false>;

export type ThemeCopyCodePluginHelper = Helper<CopyCodeOptions | false>;

export type ThemeCopyrightPluginHelper = Helper<CopyrightOptions | false>;

export type ThemeFeedPluginHelper = Helper<
  Omit<FeedOptions, "hostname"> | false
>;

export type ThemeGitPluginHelper = Helper<GitPluginOptions | false>;
export type ThemeMdEnhancePluginHelper = Helper<MarkdownEnhanceOptions | false>;

export type ThemePhotoSwipePluginHelper = Helper<PhotoSwipeOptions | false>;

export type ThemePWAPluginHelper = Helper<PWAOptions | false>;

export type ThemeReadingTimePluginHelper = Helper<ReadingTimeOptions | false>;

export type ThemeSEOPluginHelper = Helper<
  Omit<SeoOptions, "hostname" | "author"> | false
>;

export type ThemeSitemapPluginHelper = Helper<
  Omit<SitemapOptions, "hostname"> | false
>;
