import { componentsPlugin } from "@mr-hope/vuepress-plugin-components";

import type { AvailableComponent } from "@mr-hope/vuepress-plugin-components";
import type { Plugin } from "@vuepress/core";
import type { HopeThemeOptions } from "../../shared";

export const getComponentsPlugin = (
  themeConfig: HopeThemeOptions,
  options: AvailableComponent[] = ["Badge"]
): Plugin =>
  componentsPlugin({
    components: options,
    backToTop: themeConfig.backToTop !== false,
    backToTopThreshold:
      typeof themeConfig.backToTop === "number" ? themeConfig.backToTop : 300,
  });
