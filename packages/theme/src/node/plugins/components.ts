import { componentsPlugin } from "@mr-hope/vuepress-plugin-components";

import type { AvailableComponent } from "@mr-hope/vuepress-plugin-components";
import type { Plugin } from "@vuepress/core";
import type { HopeThemeOptions } from "../../shared";

export const getComponentsPlugin = (
  themeConfig: HopeThemeOptions,
  options: AvailableComponent[] = ["Badge", "FontIcon"]
): Plugin =>
  componentsPlugin({
    // FontIcon component is used by theme so we MUST enable it
    components: options.includes("FontIcon")
      ? options
      : ["FontIcon", ...options],
    backToTop:
      typeof themeConfig.backToTop === "number"
        ? themeConfig.backToTop
        : themeConfig.backToTop !== false,
    fontIconAssets: themeConfig.iconAssets,
    fontIconPrefix: themeConfig.iconPrefix,
  });
