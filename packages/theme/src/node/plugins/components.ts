import { components } from "@mr-hope/vuepress-plugin-components";

import type { AvailableComponent } from "@mr-hope/vuepress-plugin-components";
import type { PluginConfig } from "@vuepress/core";
import type { HopeThemePluginsOptions, HopeThemeOptions } from "../../shared";

export const resolveComponentsPlugin = (
  plugins: HopeThemePluginsOptions,
  themeConfig: HopeThemeOptions
): PluginConfig => {
  const enabledComponents: AvailableComponent[] = [
    "ArticleInfo",
    "BreadCrumb",
    "Badge",
    "TOC",
  ];

  if (themeConfig.fullscreen !== false) enabledComponents.push("FullScreen");
  if (plugins.blog) enabledComponents.push("Pagination");

  return components({
    components: enabledComponents,
    backToTop: themeConfig.backToTop !== false,
    backToTopThreshold:
      typeof themeConfig.backToTop === "number" ? themeConfig.backToTop : 300,
  });
};
