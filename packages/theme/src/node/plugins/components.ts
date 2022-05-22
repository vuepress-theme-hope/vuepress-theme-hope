import { componentsPlugin } from "vuepress-plugin-components";

import type { AvailableComponent } from "vuepress-plugin-components";
import type { Plugin } from "@vuepress/core";
import type { HopeThemeOptions } from "../../shared";

export const getComponentsPlugin = (
  components: AvailableComponent[] = ["Badge", "FontIcon"],
  options: Pick<
    HopeThemeOptions,
    "addThis" | "backToTop" | "hostname" | "iconAssets" | "iconPrefix"
  >
): Plugin =>
  componentsPlugin({
    // FontIcon component is used by theme so we MUST enable it
    components: components.includes("FontIcon")
      ? components
      : ["FontIcon", ...components],
    addThis: options.addThis,
    backToTop:
      typeof options.backToTop === "number"
        ? options.backToTop
        : options.backToTop !== false,
    iconAssets: options.iconAssets,
    iconPrefix: options.iconPrefix,
  });
