import type {
  ThemeBackToTopPluginHelper,
  ThemeBlogPluginHelper,
  ThemeCatalogPluginHelper,
  ThemeCommentPluginHelper,
  ThemeComponentPluginHelper,
  ThemeCopyCodePluginHelper,
  ThemeCopyrightPluginHelper,
  ThemeFeedPluginHelper,
  ThemeGitPluginHelper,
  ThemeLinksCheckPluginHelper,
  ThemeMarkdownHintPluginHelper,
  ThemeMarkdownImagePluginHelper,
  ThemeMarkdownMathPluginHelper,
  ThemeMarkdownTabPluginHelper,
  ThemeMdEnhancePluginHelper,
  ThemeNavbarHelper,
  ThemeNoticePluginHelper,
  ThemePhotoSwipePluginHelper,
  ThemePrismJsPluginHelper,
  ThemePwaPluginHelper,
  ThemeReadingTimePluginHelper,
  ThemeRedirectPluginHelper,
  ThemeRevealPluginHelper,
  ThemeSEOPluginHelper,
  ThemeShikiPluginHelper,
  ThemeSidebarArrayHelper,
  ThemeSidebarHelper,
  ThemeSidebarObjectHelper,
  ThemeSitemapPluginHelper,
  ThemeWatermarkPluginHelper,
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
export const catalog: ThemeCatalogPluginHelper = (options) => options;
export const comment: ThemeCommentPluginHelper = (options) => options;
export const components: ThemeComponentPluginHelper = (options) => options;
export const copyCode: ThemeCopyCodePluginHelper = (options) => options;
export const copyright: ThemeCopyrightPluginHelper = (options) => options;
export const feed: ThemeFeedPluginHelper = (options) => options;
export const git: ThemeGitPluginHelper = (options) => options;
export const linksCheck: ThemeLinksCheckPluginHelper = (options) => options;
export const markdownHint: ThemeMarkdownHintPluginHelper = (options) => options;
export const markdownImage: ThemeMarkdownImagePluginHelper = (options) =>
  options;
export const markdownMath: ThemeMarkdownMathPluginHelper = (options) => options;
export const markdownTab: ThemeMarkdownTabPluginHelper = (options) => options;
export const mdEnhance: ThemeMdEnhancePluginHelper = (options) => options;
export const notice: ThemeNoticePluginHelper = (options) => options;
export const photoSwipe: ThemePhotoSwipePluginHelper = (options) => options;
export const prismjs: ThemePrismJsPluginHelper = (options) => options;
export const pwa: ThemePwaPluginHelper = (options) => options;
export const readingTime: ThemeReadingTimePluginHelper = (options) => options;
export const redirect: ThemeRedirectPluginHelper = (options) => options;
export const revealjs: ThemeRevealPluginHelper = (options) => options;
export const seo: ThemeSEOPluginHelper = (options) => options;
export const shiki: ThemeShikiPluginHelper = (options) => options;
export const sitemap: ThemeSitemapPluginHelper = (options) => options;
export const watermark: ThemeWatermarkPluginHelper = (options) => options;
