import { externalLinkIconPlugin } from "@vuepress/plugin-external-link-icon";
import { nprogressPlugin } from "@vuepress/plugin-nprogress";
import { prismjsPlugin } from "@vuepress/plugin-prismjs";
import { themeDataPlugin } from "@vuepress/plugin-theme-data";
import { getActiveHeaderLinksPlugin } from "./activeHeaderLinks";
import { getBlogPlugin } from "./blog";
import { getCommentPlugin } from "./comment";
import { getComponentsPlugin } from "./components";
import { getCopyCodePlugin } from "./copyCode";
import { getCopyrightPlugin } from "./copyright";
import { getFeedPlugin } from "./feed";
import { getMdEnhancePlugin } from "./mdEnhance";
import { getPhotoSwipePlugin } from "./photoSwipe";
import { getPWAPlugin } from "./pwa";
import { getSitemapPlugin } from "./sitemap";
import { getSEOPlugin } from "./seo";

import type { PluginConfig } from "@vuepress/core";
import type {
  HopeThemeConfig,
  HopeThemeOptions,
  HopeThemePluginsOptions,
} from "../../shared";

export const getPluginConfig = (
  plugins: HopeThemePluginsOptions,
  themeData: HopeThemeConfig,
  options: Pick<
    HopeThemeOptions,
    "addThis" | "backToTop" | "hostname" | "iconAssets" | "iconPrefix"
  >,
  legacy = false
): PluginConfig => {
  const pluginConfig = [
    getComponentsPlugin(plugins.components, options),
    getActiveHeaderLinksPlugin(plugins.activeHeaderLinks),
    plugins.externalLinkIcon === false ? null : externalLinkIconPlugin(),
    plugins.nprogress === false ? null : nprogressPlugin(),
    plugins.prismjs === false ? null : prismjsPlugin(),
    themeDataPlugin({ themeData }),
    getBlogPlugin(themeData, plugins.blog),
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
