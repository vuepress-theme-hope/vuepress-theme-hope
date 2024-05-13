import { nprogressPlugin } from "@vuepress/plugin-nprogress";
import { themeDataPlugin } from "@vuepress/plugin-theme-data";
import type { App, PluginConfig } from "vuepress/core";

import { getActiveHeaderLinksPlugin } from "./activeHeaderLinks.js";
import { getBackToTop } from "./backToTop.js";
import { getBlogPlugin } from "./blog/index.js";
import { getCatalogPlugin } from "./catalog.js";
import { getCommentPlugin } from "./comment.js";
import { getComponentsPlugin } from "./components.js";
import { getCopyCodePlugin } from "./copyCode.js";
import { getCopyrightPlugin } from "./copyright.js";
import { getFeedPlugin } from "./feed.js";
import { getLinksCheckPlugin } from "./linksCheck.js";
import { getMdEnhancePlugin } from "./mdEnhance.js";
import { getNoticePlugin } from "./notice.js";
import { getPhotoSwipePlugin } from "./photoSwipe.js";
import { getPwaPlugin } from "./pwa.js";
import { getRedirectPlugin } from "./redirect.js";
import { getRtlPlugin } from "./rtl.js";
import { getSearchPlugin } from "./search.js";
import { getSEOPlugin } from "./seo.js";
import { getSitemapPlugin } from "./sitemap.js";
import { getWatermarkPlugin } from "./watermark.js";
import type {
  PluginsOptions,
  ThemeData,
  ThemeOptions,
} from "../../shared/index.js";
import { checkPluginsOptions } from "../check/index.js";

/**
 * @private
 *
 * Get theme plugins
 */
export const getPlugins = (
  app: App,
  pluginsOptions: PluginsOptions,
  themeData: ThemeData,
  options: Pick<
    ThemeOptions,
    "hostname" | "hotReload" | "iconAssets" | "iconPrefix" | "favicon"
  >,
  legacy = false,
): PluginConfig => {
  checkPluginsOptions(pluginsOptions);

  const plugins = [
    getLinksCheckPlugin(pluginsOptions.linksCheck),
    getComponentsPlugin(options, pluginsOptions.components, legacy),
    getActiveHeaderLinksPlugin(pluginsOptions.activeHeaderLinks),
    getCatalogPlugin(pluginsOptions.catalog),
    getBackToTop(pluginsOptions.backToTop),
    pluginsOptions.nprogress === false ? null : nprogressPlugin(),
    themeDataPlugin({ themeData }),
    getBlogPlugin(themeData, pluginsOptions.blog, options.hotReload),
    getCommentPlugin(pluginsOptions.comment),
    getCopyCodePlugin(pluginsOptions.copyCode),
    getCopyrightPlugin(themeData, pluginsOptions.copyright, options.hostname),
    // Seo should work before feed
    getSEOPlugin(themeData, pluginsOptions, options.hostname),
    getFeedPlugin(
      themeData,
      pluginsOptions.feed,
      options.hostname,
      options.favicon,
      legacy,
    ),
    getMdEnhancePlugin(pluginsOptions.mdEnhance, legacy),
    getNoticePlugin(pluginsOptions.notice),
    getPhotoSwipePlugin(pluginsOptions.photoSwipe),
    getPwaPlugin(pluginsOptions.pwa, options.favicon),
    getSearchPlugin(app, themeData, pluginsOptions),
    getSitemapPlugin(pluginsOptions.sitemap, options.hostname),
    getRtlPlugin(themeData),
    getRedirectPlugin(pluginsOptions.redirect),
    getWatermarkPlugin(pluginsOptions.watermark),
  ].filter((item) => item !== null) as PluginConfig;

  return plugins;
};
