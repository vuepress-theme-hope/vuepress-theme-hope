import { components } from "@mr-hope/vuepress-plugin-components";

import type { PluginConfig } from "@vuepress/core";
import type { HopeThemePluginsOptions, HopeThemeOptions } from "../../shared";

export const resolveComponentsPlugin = (
  plugins: HopeThemePluginsOptions,
  themeConfig: HopeThemeOptions
): PluginConfig =>
  components({
    articleInfo: true,
    backToTop: themeConfig.backToTop !== false,
    backToTopThreshold:
      typeof themeConfig.backToTop === "number" ? themeConfig.backToTop : 300,
    breadcrumb: true,
    badge: true,
    fullScreen: themeConfig.fullScreen !== false,
    pagination: Boolean(plugins.blog),
    toc: true,
  });
