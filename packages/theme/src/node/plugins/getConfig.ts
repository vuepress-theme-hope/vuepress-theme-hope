import { components } from "@mr-hope/vuepress-plugin-components";
import { comment } from "vuepress-plugin-comment2";
import { copyCode } from "vuepress-plugin-copy-code2";
import { resolveCommentOptions } from "./comment";
import { resolveComponentsOptions } from "./components";
import {
  resolveActiveHeaderLinksPluginOptions,
  resolveContainerPluginOptionsForCodeGroup,
  resolveContainerPluginOptionsForCodeGroupItem,
  resolveGitPluginOptions,
} from "./plugins";
import { resolveCopyCodeOptions } from "./copy-code";

import type { PluginConfig, PluginOptions } from "@vuepress/core";
import type { HopeThemeOptions, HopeThemePluginsOptions } from "../../shared";

export const getPluginConfig = (
  plugins: HopeThemePluginsOptions,
  themeData: Omit<HopeThemeOptions, "plugins">
): PluginConfig<PluginOptions>[] => {
  return [
    components(resolveComponentsOptions(themeData)),
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
    comment(resolveCommentOptions(plugins.comment)),
    copyCode(resolveCopyCodeOptions(plugins.copyCode)),
    ["feed2", plugins.feed || true],
    ["md-enhance", plugins.mdEnhance || {}],
    ["photo-swipe", plugins.photoSwipe || true],
    ["pwa2", plugins.pwa || true],
    ["seo2", plugins.seo || true],
    ["sitemap2", plugins.sitemap || true],
  ];
};
