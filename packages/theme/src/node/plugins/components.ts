import { components } from "@mr-hope/vuepress-plugin-components";

import type { AvailableComponent } from "@mr-hope/vuepress-plugin-components";
import type { PluginConfig } from "@vuepress/core";
import type { HopeThemeOptions } from "../../shared";

export const resolveComponentsPlugin = (
  themeConfig: HopeThemeOptions
): PluginConfig => {
  const enabledComponents: AvailableComponent[] = ["Badge"];

  return components({
    components: enabledComponents,
    backToTop: themeConfig.backToTop !== false,
    backToTopThreshold:
      typeof themeConfig.backToTop === "number" ? themeConfig.backToTop : 300,
  });
};
