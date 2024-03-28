import { externalLinkIconPlugin } from "@vuepress/plugin-external-link-icon";
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
import { getPhotoSwipePlugin } from "./photoSwipe.js";
import { getPwaPlugin } from "./pwa.js";
import { getRedirectPlugin } from "./redirect.js";
import { getRtlPlugin } from "./rtl.js";
import { getSearchPlugin } from "./search.js";
import { getSEOPlugin } from "./seo.js";
import { getSitemapPlugin } from "./sitemap.js";
import type {
  PluginsOptions,
  ThemeData,
  ThemeOptions,
} from "../../shared/index.js";
import { checkPluginOptions } from "../check/index.js";

/**
 * @private
 *
 * Get theme plugins
 */
export const getPluginConfig = (
  app: App,
  plugins: PluginsOptions,
  themeData: ThemeData,
  options: Pick<
    ThemeOptions,
    "hostname" | "hotReload" | "iconAssets" | "iconPrefix" | "favicon"
  >,
  legacy = false,
): PluginConfig => {
  checkPluginOptions(plugins);

  const pluginConfig = [
    getLinksCheckPlugin(plugins.linksCheck),
    getComponentsPlugin(options, plugins.components, legacy),
    getActiveHeaderLinksPlugin(plugins.activeHeaderLinks),
    getCatalogPlugin(plugins.catalog),
    getBackToTop(plugins.backToTop),
    plugins.externalLinkIcon === false ? null : externalLinkIconPlugin(),
    plugins.nprogress === false ? null : nprogressPlugin(),
    themeDataPlugin({ themeData }),
    getBlogPlugin(app, themeData, plugins.blog, options.hotReload),
    getCommentPlugin(plugins.comment),
    getCopyCodePlugin(plugins.copyCode),
    getCopyrightPlugin(themeData, plugins.copyright, options.hostname),
    // Seo should work before feed
    getSEOPlugin(themeData, plugins, options.hostname),
    getFeedPlugin(
      themeData,
      plugins.feed,
      options.hostname,
      options.favicon,
      legacy,
    ),
    getMdEnhancePlugin(plugins.mdEnhance, legacy),
    getPhotoSwipePlugin(plugins.photoSwipe),
    getPwaPlugin(plugins.pwa, options.favicon),
    getSearchPlugin(app, themeData, plugins),
    getSitemapPlugin(plugins.sitemap, options.hostname),
    getRtlPlugin(themeData),
    getRedirectPlugin(plugins.redirect),
  ].filter((item) => item !== null) as PluginConfig;

  return pluginConfig;
};
