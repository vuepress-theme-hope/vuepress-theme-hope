import type { App, PluginConfig } from "@vuepress/core";
import { externalLinkIconPlugin } from "@vuepress/plugin-external-link-icon";
import { nprogressPlugin } from "@vuepress/plugin-nprogress";
import { themeDataPlugin } from "@vuepress/plugin-theme-data";

import { getActiveHeaderLinksPlugin } from "./activeHeaderLinks.js";
import { getAutoCatalogPlugin } from "./autoCatalog.js";
import { getBlogPlugin } from "./blog/index.js";
import { getCommentPlugin } from "./comment.js";
import { getComponentsPlugin } from "./components.js";
import { getCopyCodePlugin } from "./copyCode.js";
import { getCopyrightPlugin } from "./copyright.js";
import { getFeedPlugin } from "./feed.js";
import { getMdEnhancePlugin } from "./mdEnhance.js";
import { getPhotoSwipePlugin } from "./photoSwipe.js";
import { getPWAPlugin } from "./pwa.js";
import { getRtlPlugin } from "./rtl.js";
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
    | "backToTop"
    | "hostname"
    | "hotReload"
    | "iconAssets"
    | "iconPrefix"
    | "favicon"
  >,
  legacy = false,
): PluginConfig => {
  checkPluginOptions(plugins);

  const pluginConfig = [
    getComponentsPlugin(options, plugins.components, legacy),
    getActiveHeaderLinksPlugin(plugins.activeHeaderLinks),
    getAutoCatalogPlugin(plugins.autoCatalog),
    plugins.externalLinkIcon === false ? null : externalLinkIconPlugin(),
    plugins.nprogress === false ? null : nprogressPlugin(),
    themeDataPlugin({ themeData }),
    getBlogPlugin(app, themeData, plugins.blog, options.hotReload),
    getCommentPlugin(plugins.comment, legacy),
    getCopyCodePlugin(plugins.copyCode),
    getCopyrightPlugin(themeData, plugins.copyright, options.hostname),
    // seo should work before feed
    getSEOPlugin(themeData, plugins, options.hostname, legacy),
    getFeedPlugin(
      themeData,
      plugins.feed,
      options.hostname,
      options.favicon,
      legacy,
    ),
    getMdEnhancePlugin(plugins.mdEnhance, legacy),
    getPhotoSwipePlugin(plugins.photoSwipe),
    getPWAPlugin(plugins.pwa, options.favicon, legacy),
    getSitemapPlugin(plugins.sitemap, options.hostname, legacy),
    getRtlPlugin(themeData),
  ].filter((item) => item !== null) as PluginConfig;

  return pluginConfig;
};
