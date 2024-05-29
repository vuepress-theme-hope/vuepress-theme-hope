import type {
  ThemeBackToTopPluginHelper,
  ThemeBlogPluginHelper,
  ThemeCommentPluginHelper,
  ThemeComponentPluginHelper,
  ThemeCopyCodePluginHelper,
  ThemeCopyrightPluginHelper,
  ThemeFeedPluginHelper,
  ThemeGitPluginHelper,
  ThemeLinksCheckPluginHelper,
  ThemeMdEnhancePluginHelper,
  ThemeNavbarHelper,
  ThemePhotoSwipePluginHelper,
  ThemePrismJsPluginHelper,
  ThemePwaPluginHelper,
  ThemeReadingTimePluginHelper,
  ThemeRedirectPluginHelper,
  ThemeSEOPluginHelper,
  ThemeShikiPluginHelper,
  ThemeSidebarArrayHelper,
  ThemeSidebarHelper,
  ThemeSidebarObjectHelper,
  ThemeSitemapPluginHelper,
} from "./typings/index.js";

export const navbar: ThemeNavbarHelper = (options) => options;

export const sidebar: ThemeSidebarHelper = (options) => options;

export const arraySidebar: ThemeSidebarArrayHelper = (sidebarConfig) =>
  sidebarConfig;

export const objectSidebar: ThemeSidebarObjectHelper = (sidebarConfig) =>
  sidebarConfig;

export const backToTop: ThemeBackToTopPluginHelper = (backToTopConfig) =>
  backToTopConfig;

export const blog: ThemeBlogPluginHelper = (options) => options;

export const comment: ThemeCommentPluginHelper = (options) => options;

export const components: ThemeComponentPluginHelper = (options) => options;

export const copyCode: ThemeCopyCodePluginHelper = (options) => options;

export const copyright: ThemeCopyrightPluginHelper = (options) => options;

export const feed: ThemeFeedPluginHelper = (options) => options;

export const git: ThemeGitPluginHelper = (options) => options;

export const linkCheck: ThemeLinksCheckPluginHelper = (options) => options;

export const mdEnhance: ThemeMdEnhancePluginHelper = (options) => options;

export const photoSwipe: ThemePhotoSwipePluginHelper = (options) => options;

export const prismjs: ThemePrismJsPluginHelper = (options) => options;

export const pwa: ThemePwaPluginHelper = (options) => options;

export const readingTime: ThemeReadingTimePluginHelper = (options) => options;

export const redirect: ThemeRedirectPluginHelper = (options) => options;

export const seo: ThemeSEOPluginHelper = (options) => options;

export const shiki: ThemeShikiPluginHelper = (options) => options;

export const sitemap: ThemeSitemapPluginHelper = (options) => options;
