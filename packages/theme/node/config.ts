import { HopeVuepressConfig, ResolvedHopeVuepressConfig } from "../types";
import { deepAssignReverse } from "@mr-hope/vuepress-utils";
import defaultConfig from "./defaultConfig";
import { resolveLocales } from "./locales";
import { resolveThemeConfig } from "./themeConfig";
import { head } from "@mr-hope/vuepress-plugin-pwa";

export const config = (
  config: HopeVuepressConfig
): ResolvedHopeVuepressConfig => {
  // merge default config
  deepAssignReverse(defaultConfig, config);

  const resolvedConfig = config as ResolvedHopeVuepressConfig;

  resolveThemeConfig(resolvedConfig.themeConfig);
  resolveLocales(resolvedConfig);

  if (resolvedConfig.themeConfig.pwa)
    resolvedConfig.head = head(resolvedConfig.themeConfig.pwa, config.head);

  return resolvedConfig;
};
