import type { ComponentOptions } from "@mr-hope/vuepress-plugin-components";
import type { HopeThemeOptions } from "../../shared";

export const resolveComponentsOptions = (
  themeConfig: HopeThemeOptions
): ComponentOptions => ({
  articleInfo: true,
  backToTop: themeConfig.backToTop !== false,
  backToTopThreshold:
    typeof themeConfig.backToTop === "number" ? themeConfig.backToTop : 300,
  breadcrumb: true,
  badge: true,
  pagination: true,
  screenFull: true,
});
