import { resolveCommentOptions } from "./comment";
import {
  resolveActiveHeaderLinksPluginOptions,
  resolveContainerPluginOptionsForCodeGroup,
  resolveContainerPluginOptionsForCodeGroupItem,
  resolveGitPluginOptions,
} from "./plugins";

import type { PluginConfig, PluginOptions } from "@vuepress/core";
import type { HopeThemeData, HopeThemePluginsOptions } from "../../shared";

export const getPluginConfig = (
  plugins: HopeThemePluginsOptions,
  themeData: Omit<HopeThemeData, "plugins">
): PluginConfig<PluginOptions>[] => {
  return [
    ["@mr-hope/components"],
    [
      "@vuepress/active-header-links",
      resolveActiveHeaderLinksPluginOptions(plugins),
    ],
    ["@vuepress/container", resolveContainerPluginOptionsForCodeGroup(plugins)],
    [
      "@vuepress/container",
      resolveContainerPluginOptionsForCodeGroupItem(plugins),
    ],
    ["@vuepress/git", resolveGitPluginOptions(plugins, themeData)],
    ["@vuepress/nprogress", plugins.nprogress !== false],
    ["@vuepress/prismjs", plugins.prismjs !== false],
    ["@vuepress/theme-data", { themeData }],
    ["comment2", resolveCommentOptions(plugins.comment)],
    ["copy-code2", plugins.copyCode || true],
    ["feed2", plugins.feed || true],
    ["md-enhance", plugins.mdEnhance || {}],
    ["photo-swipe", plugins.photoSwipe || true],
    ["pwa2", plugins.pwa || true],
    ["seo2", plugins.seo || true],
    ["sitemap2", plugins.sitemap || true],
  ];
};
