import type { ComponentOptions } from "@mr-hope/vuepress-plugin-components";
import type { HopeThemePluginsOptions, HopeThemeOptions } from "../../shared";

export const resolveComponentsOptions = (
  plugins: HopeThemePluginsOptions,
  themeConfig: HopeThemeOptions
): ComponentOptions => ({
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
