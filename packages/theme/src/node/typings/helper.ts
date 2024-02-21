import type { CopyCodePluginOptions } from "@vuepress/plugin-copy-code";
import type { CopyrightPluginOptions } from "@vuepress/plugin-copyright";
import type { FeedPluginOptions } from "@vuepress/plugin-feed";
import type { GitPluginOptions } from "@vuepress/plugin-git";
import type { PhotoSwipePluginOptions } from "@vuepress/plugin-photo-swipe";
import type { PwaPluginOptions } from "@vuepress/plugin-pwa";
import type { ReadingTimePluginOptions } from "@vuepress/plugin-reading-time";
import type { SeoPluginOptions } from "@vuepress/plugin-seo";
import type { SitemapPluginOptions } from "@vuepress/plugin-sitemap";
import type { CommentOptions } from "vuepress-plugin-comment2";
import type { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";

import type {
  BlogOptions,
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

export type ThemeBlogPluginHelper = Helper<BlogOptions | boolean>;

export type ThemeCommentPluginHelper = Helper<CommentOptions | false>;

export type ThemeCopyCodePluginHelper = Helper<CopyCodePluginOptions | false>;

export type ThemeCopyrightPluginHelper = Helper<CopyrightPluginOptions | false>;

export type ThemeFeedPluginHelper = Helper<
  Omit<FeedPluginOptions, "hostname"> | false
>;

export type ThemeGitPluginHelper = Helper<GitPluginOptions | false>;
export type ThemeMdEnhancePluginHelper = Helper<MarkdownEnhanceOptions | false>;

export type ThemePhotoSwipePluginHelper = Helper<
  PhotoSwipePluginOptions | false
>;

export type ThemePwaPluginHelper = Helper<PwaPluginOptions | false>;

export type ThemeReadingTimePluginHelper = Helper<
  ReadingTimePluginOptions | false
>;

export type ThemeSEOPluginHelper = Helper<
  Omit<SeoPluginOptions, "hostname" | "author"> | false
>;

export type ThemeSitemapPluginHelper = Helper<
  Omit<SitemapPluginOptions, "hostname"> | false
>;
