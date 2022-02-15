import { components } from "@mr-hope/vuepress-plugin-components";
import { blog } from "vuepress-plugin-blog2";
import { comment } from "vuepress-plugin-comment2";
import { copyCode } from "vuepress-plugin-copy-code2";
import { feed } from "vuepress-plugin-feed2";
import { mdEnhance } from "vuepress-plugin-md-enhance";
import { photoSwipe } from "vuepress-plugin-photo-swipe";
import { pwa } from "vuepress-plugin-pwa2";
import { seo } from "vuepress-plugin-seo2";
import { sitemap } from "vuepress-plugin-sitemap2";

import { resolveActiveHeaderLinksOptions } from "./activeHeaderLinks";
import { resolveBlogOptions } from "./blog";
import { resolveCommentOptions } from "./comment";
import { resolveComponentsOptions } from "./components";
import { resolveCopyCodeOptions } from "./copyCode";
import { resolveFeedOptions } from "./feed";
import { resolveMdEnhanceOptions } from "./mdEnhance";
import { resolvePhotoSwipeOptions } from "./photoSwipe";
import { resolvePWAOptions } from "./pwa";
import { resolveSitemapOptions } from "./sitemap";
import { resolveSEOOptions } from "./seo";

import type { App, PluginConfig, PluginOptions } from "@vuepress/core";
import type { HopeThemeConfig, HopeThemePluginsOptions } from "../../shared";

export const getPluginConfig = (
  app: App,
  plugins: HopeThemePluginsOptions,
  themeData: HopeThemeConfig
): PluginConfig<PluginOptions>[] => {
  const pluginConfig: PluginConfig<PluginOptions>[] = [
    components(resolveComponentsOptions(plugins, themeData)),
    [
      "@vuepress/active-header-links",
      resolveActiveHeaderLinksOptions(plugins.activeHeaderLinks),
    ],
    ["@vuepress/external-link-icon", plugins.externalLinkIcon !== false],
    ["@vuepress/nprogress", plugins.nprogress !== false],
    ["@vuepress/prismjs", plugins.prismjs !== false],
    ["@vuepress/theme-data", { themeData }],
    blog(resolveBlogOptions(plugins.blog)),
    comment(resolveCommentOptions(plugins.comment)),
    copyCode(resolveCopyCodeOptions(plugins.copyCode)),
    // seo should work before feed
    seo(resolveSEOOptions(themeData, plugins)),
    feed(resolveFeedOptions(themeData, plugins.feed)),
    mdEnhance(resolveMdEnhanceOptions(plugins.mdEnhance)),
    photoSwipe(resolvePhotoSwipeOptions(plugins.photoSwipe)),
    pwa(resolvePWAOptions(plugins.pwa)),
    sitemap(resolveSitemapOptions(themeData, plugins.sitemap)),
  ];

  if (app.env.isDebug) console.log("Theme plugin options:", pluginConfig);

  return pluginConfig;
};
