import type { BackToTopPluginOptions } from "@vuepress/plugin-back-to-top";
import type { CatalogPluginOptions } from "@vuepress/plugin-catalog";
import type { CommentOptions } from "@vuepress/plugin-comment";
import type { CopyCodePluginOptions } from "@vuepress/plugin-copy-code";
import type { CopyrightPluginOptions } from "@vuepress/plugin-copyright";
import type { FeedPluginOptions } from "@vuepress/plugin-feed";
import type { GitPluginOptions } from "@vuepress/plugin-git";
import type { LinksCheckPluginOptions } from "@vuepress/plugin-links-check";
import type {
  NoticeOptions,
  NoticePluginOptions,
} from "@vuepress/plugin-notice";
import type { PhotoSwipePluginOptions } from "@vuepress/plugin-photo-swipe";
import type { PrismjsPluginOptions } from "@vuepress/plugin-prismjs";
import type { PwaPluginOptions } from "@vuepress/plugin-pwa";
import type { ReadingTimePluginOptions } from "@vuepress/plugin-reading-time";
import type { RedirectPluginOptions } from "@vuepress/plugin-redirect";
import type { RevealJsPluginOptions } from "@vuepress/plugin-revealjs";
import type { SeoPluginOptions } from "@vuepress/plugin-seo";
import type { ShikiPluginOptions } from "@vuepress/plugin-shiki";
import type { SitemapPluginOptions } from "@vuepress/plugin-sitemap";
import type { WatermarkPluginOptions } from "@vuepress/plugin-watermark";
import type { ComponentPluginOptions } from "vuepress-plugin-components";

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

export type ThemeBackToTopPluginHelper = Helper<
  BackToTopPluginOptions | boolean
>;

export type ThemeBlogPluginHelper = Helper<BlogOptions | boolean>;

export type ThemeCatalogPluginHelper = Helper<CatalogPluginOptions | boolean>;

export type ThemeCommentPluginHelper = Helper<CommentOptions | false>;

export type ThemeComponentPluginHelper = Helper<ComponentPluginOptions>;

export type ThemeCopyCodePluginHelper = Helper<CopyCodePluginOptions | boolean>;

export type ThemeCopyrightPluginHelper = Helper<
  CopyrightPluginOptions | boolean
>;

export type ThemeFeedPluginHelper = Helper<
  Omit<FeedPluginOptions, "hostname"> | boolean
>;

export type ThemeGitPluginHelper = Helper<GitPluginOptions | boolean>;

export type ThemeLinksCheckPluginHelper = Helper<
  LinksCheckPluginOptions | boolean
>;

export type ThemeNoticePluginHelper = Helper<
  NoticePluginOptions | NoticeOptions[]
>;

export type ThemePhotoSwipePluginHelper = Helper<
  PhotoSwipePluginOptions | boolean
>;

export type ThemePrismJsPluginHelper = Helper<PrismjsPluginOptions | boolean>;

export type ThemePwaPluginHelper = Helper<PwaPluginOptions | boolean>;

export type ThemeReadingTimePluginHelper = Helper<
  ReadingTimePluginOptions | false
>;

export type ThemeRedirectPluginHelper = Helper<RedirectPluginOptions | boolean>;

export type ThemeRevealPluginHelper = Helper<
  Omit<RevealJsPluginOptions, "layout"> | boolean
>;

export type ThemeSEOPluginHelper = Helper<
  Omit<SeoPluginOptions, "hostname" | "author"> | boolean
>;

export type ThemeShikiPluginHelper = Helper<ShikiPluginOptions | boolean>;

export type ThemeSitemapPluginHelper = Helper<
  Omit<SitemapPluginOptions, "hostname"> | boolean
>;

export type ThemeWatermarkPluginHelper = Helper<
  WatermarkPluginOptions | boolean
>;
