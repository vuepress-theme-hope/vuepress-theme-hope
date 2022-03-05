import { sitemap } from "vuepress-plugin-sitemap2";

import { resolveActiveHeaderLinksPlugin } from "./activeHeaderLinks";
import { resolveBlogPlugin } from "./blog";
import { resolveCommentPlugin } from "./comment";
import { resolveComponentsPlugin } from "./components";
import { resolveCopyCodePlugin } from "./copyCode";
import { resolveFeedPlugin } from "./feed";
import { resolveMdEnhancePlugin } from "./mdEnhance";
import { resolvePhotoSwipePlugin } from "./photoSwipe";
import { resolvePWAPlugin } from "./pwa";
import { resolveSearchPlugin } from "./search";
import { resolveSitemapOptions } from "./sitemap";
import { resolveSEOPlugin } from "./seo";

import type { App, PluginConfig, PluginOptions } from "@vuepress/core";
import type { HopeThemeConfig, HopeThemePluginsOptions } from "../../shared";

export const getPluginConfig = (
  app: App,
  plugins: HopeThemePluginsOptions,
  themeData: HopeThemeConfig
): PluginConfig<PluginOptions>[] => {
  const pluginConfig = [
    resolveComponentsPlugin(plugins, themeData),
    resolveActiveHeaderLinksPlugin(plugins.activeHeaderLinks),
    ["@vuepress/external-link-icon", plugins.externalLinkIcon !== false],
    ["@vuepress/nprogress", plugins.nprogress !== false],
    ["@vuepress/prismjs", plugins.prismjs !== false],
    ["@vuepress/theme-data", { themeData }],
    resolveBlogPlugin(themeData, plugins.blog),
    resolveCommentPlugin(plugins.comment),
    resolveCopyCodePlugin(themeData, plugins.copyCode),
    // seo should work before feed
    resolveSEOPlugin(themeData, plugins),
    resolveFeedPlugin(themeData, plugins.feed),
    resolveMdEnhancePlugin(plugins.mdEnhance),
    resolvePhotoSwipePlugin(plugins.photoSwipe),
    resolvePWAPlugin(plugins.pwa),
    sitemap(resolveSitemapOptions(themeData, plugins.sitemap)),

    // try resolving search plugin
    resolveSearchPlugin(plugins),
  ].filter(
    (item) => (item as unknown[])[1] !== false
  ) as PluginConfig<PluginOptions>[];

  if (app.env.isDebug) console.log("Theme plugin options:", pluginConfig);

  return pluginConfig;
};
