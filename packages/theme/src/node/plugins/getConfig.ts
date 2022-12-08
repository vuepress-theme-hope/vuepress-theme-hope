import { externalLinkIconPlugin } from "@vuepress/plugin-external-link-icon";
import { nprogressPlugin } from "@vuepress/plugin-nprogress";
import { prismjsPlugin } from "@vuepress/plugin-prismjs";
import { themeDataPlugin } from "@vuepress/plugin-theme-data";
import { getActiveHeaderLinksPlugin } from "./activeHeaderLinks.js";
import { getBlogPlugin } from "./blog.js";
import { getCommentPlugin } from "./comment.js";
import { getComponentsPlugin } from "./components.js";
import { getCopyCodePlugin } from "./copyCode.js";
import { getCopyrightPlugin } from "./copyright.js";
import { getFeedPlugin } from "./feed.js";
import { getMdEnhancePlugin } from "./mdEnhance.js";
import { getPhotoSwipePlugin } from "./photoSwipe.js";
import { getPWAPlugin } from "./pwa.js";
import { getSitemapPlugin } from "./sitemap.js";
import { getSEOPlugin } from "./seo.js";

import type { PluginConfig } from "@vuepress/core";
import type {
  ThemeData,
  ThemeOptions,
  PluginsOptions,
} from "../../shared/index.js";

export const getPluginConfig = (
  plugins: PluginsOptions,
  themeData: ThemeData,
  options: Pick<
    ThemeOptions,
    "backToTop" | "hostname" | "hotReload" | "iconAssets" | "iconPrefix"
  >,
  legacy = false
): PluginConfig => {
  const pluginConfig = [
    getComponentsPlugin(options, plugins.components, legacy),
    getActiveHeaderLinksPlugin(plugins.activeHeaderLinks),
    plugins.externalLinkIcon === false ? null : externalLinkIconPlugin(),
    plugins.nprogress === false ? null : nprogressPlugin(),
    plugins.prismjs === false ? null : prismjsPlugin(),
    themeDataPlugin({ themeData }),
    getBlogPlugin(themeData, plugins.blog, options.hotReload),
    getCommentPlugin(plugins.comment, legacy),
    getCopyCodePlugin(themeData, plugins.copyCode),
    getCopyrightPlugin(themeData, plugins.copyright, options.hostname),
    // seo should work before feed
    getSEOPlugin(themeData, plugins, options.hostname, legacy),
    getFeedPlugin(themeData, plugins.feed, options.hostname, legacy),
    getMdEnhancePlugin(plugins.mdEnhance, legacy),
    getPhotoSwipePlugin(plugins.photoSwipe),
    getPWAPlugin(plugins.pwa, legacy),
    getSitemapPlugin(plugins.sitemap, options.hostname, legacy),
  ].filter((item) => item !== null) as PluginConfig;

  return pluginConfig;
};
