import type {
  HopeThemeBlogPluginHelper,
  HopeThemeCommentPluginHelper,
  HopeThemeCopyCodePluginHelper,
  HopeThemeCopyrightPluginHelper,
  HopeThemeFeedPluginHelper,
  HopeThemeGitPluginHelper,
  HopeThemeMdEnhancePluginHelper,
  HopeThemeNavbarHelper,
  HopeThemePhotoSwipePluginHelper,
  HopeThemePWAPluginHelper,
  HopeThemeReadingTimePluginHelper,
  HopeThemeSEOPluginHelper,
  HopeThemeSidebarArrayHelper,
  HopeThemeSidebarHelper,
  HopeThemeSidebarObjectHelper,
  HopeThemeSitemapPluginHelper,
} from "../shared";

export const navbar: HopeThemeNavbarHelper = (navbarConfig) => navbarConfig;

export const sidebar: HopeThemeSidebarHelper = (sidebarConfig) => sidebarConfig;

export const arraySidebar: HopeThemeSidebarArrayHelper = (sidebarConfig) =>
  sidebarConfig;

export const objectSidebar: HopeThemeSidebarObjectHelper = (sidebarConfig) =>
  sidebarConfig;

export const blog: HopeThemeBlogPluginHelper = (blogConfig) => blogConfig;

export const comment: HopeThemeCommentPluginHelper = (commentConfig) =>
  commentConfig;

export const copyCode: HopeThemeCopyCodePluginHelper = (copyCodeConfig) =>
  copyCodeConfig;

export const copyright: HopeThemeCopyrightPluginHelper = (copyrightConfig) =>
  copyrightConfig;

export const feed: HopeThemeFeedPluginHelper = (feedConfig) => feedConfig;

export const git: HopeThemeGitPluginHelper = (gitConfig) => gitConfig;

export const mdEnhance: HopeThemeMdEnhancePluginHelper = (mdEnhanceConfig) =>
  mdEnhanceConfig;

export const photoSwipe: HopeThemePhotoSwipePluginHelper = (photoSwipeConfig) =>
  photoSwipeConfig;

export const pwa: HopeThemePWAPluginHelper = (pwaConfig) => pwaConfig;

export const readingTime: HopeThemeReadingTimePluginHelper = (
  readingTimeConfig
) => readingTimeConfig;

export const seo: HopeThemeSEOPluginHelper = (seoConfig) => seoConfig;

export const sitemap: HopeThemeSitemapPluginHelper = (sitemapConfig) =>
  sitemapConfig;
