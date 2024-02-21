import type {
  ThemeBlogPluginHelper,
  ThemeCommentPluginHelper,
  ThemeCopyCodePluginHelper,
  ThemeCopyrightPluginHelper,
  ThemeFeedPluginHelper,
  ThemeGitPluginHelper,
  ThemeMdEnhancePluginHelper,
  ThemeNavbarHelper,
  ThemePhotoSwipePluginHelper,
  ThemePwaPluginHelper,
  ThemeReadingTimePluginHelper,
  ThemeSEOPluginHelper,
  ThemeSidebarArrayHelper,
  ThemeSidebarHelper,
  ThemeSidebarObjectHelper,
  ThemeSitemapPluginHelper,
} from "./typings/index.js";

export const navbar: ThemeNavbarHelper = (navbarConfig) => navbarConfig;

export const sidebar: ThemeSidebarHelper = (sidebarConfig) => sidebarConfig;

export const arraySidebar: ThemeSidebarArrayHelper = (sidebarConfig) =>
  sidebarConfig;

export const objectSidebar: ThemeSidebarObjectHelper = (sidebarConfig) =>
  sidebarConfig;

export const blog: ThemeBlogPluginHelper = (blogConfig) => blogConfig;

export const comment: ThemeCommentPluginHelper = (commentConfig) =>
  commentConfig;

export const copyCode: ThemeCopyCodePluginHelper = (copyCodeConfig) =>
  copyCodeConfig;

export const copyright: ThemeCopyrightPluginHelper = (copyrightConfig) =>
  copyrightConfig;

export const feed: ThemeFeedPluginHelper = (feedConfig) => feedConfig;

export const git: ThemeGitPluginHelper = (gitConfig) => gitConfig;

export const mdEnhance: ThemeMdEnhancePluginHelper = (mdEnhanceConfig) =>
  mdEnhanceConfig;

export const photoSwipe: ThemePhotoSwipePluginHelper = (photoSwipeConfig) =>
  photoSwipeConfig;

export const pwa: ThemePwaPluginHelper = (pwaConfig) => pwaConfig;

export const readingTime: ThemeReadingTimePluginHelper = (readingTimeConfig) =>
  readingTimeConfig;

export const seo: ThemeSEOPluginHelper = (seoConfig) => seoConfig;

export const sitemap: ThemeSitemapPluginHelper = (sitemapConfig) =>
  sitemapConfig;
