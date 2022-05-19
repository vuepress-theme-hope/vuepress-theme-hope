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
import type { HopeThemeConfig, HopeThemePluginsOptions } from "../../shared";

export const getPluginConfig = (
  plugins: HopeThemePluginsOptions,
  themeData: HopeThemeConfig,
  hostname: string
): PluginConfig => {
  const pluginConfig = [
    getComponentsPlugin(themeData, plugins.components),
    getActiveHeaderLinksPlugin(plugins.activeHeaderLinks),
    plugins.externalLinkIcon === false ? null : externalLinkIconPlugin(),
    plugins.nprogress === false ? null : nprogressPlugin(),
    plugins.prismjs === false ? null : prismjsPlugin(),
    themeDataPlugin({ themeData }),
    getBlogPlugin(themeData, plugins.blog),
    getCommentPlugin(plugins.comment),
    getCopyCodePlugin(themeData, plugins.copyCode),
    getCopyrightPlugin(hostname, themeData, plugins.copyright),
    // seo should work before feed
    getSEOPlugin(hostname, themeData, plugins),
    getFeedPlugin(hostname, themeData, plugins.feed),
    getMdEnhancePlugin(plugins.mdEnhance),
    getPhotoSwipePlugin(plugins.photoSwipe),
    getPWAPlugin(plugins.pwa),
    getSitemapPlugin(hostname, plugins.sitemap),
  ].filter((item) => item !== null) as PluginConfig;

  return pluginConfig;
};
