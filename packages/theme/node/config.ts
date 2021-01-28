import { HopeVuePressConfig, ResolvedHopeVuePressConfig } from "../types";
import { deepAssignReverse } from "@mr-hope/vuepress-shared";
import defaultConfig from "./defaultConfig";
import { resolveLocales } from "./locales";
import { resolveThemeConfig } from "./themeConfig";

export const config = (
  config: HopeVuePressConfig
): ResolvedHopeVuePressConfig => {
  // merge default config
  deepAssignReverse(defaultConfig, config);

  const resolvedConfig = config as ResolvedHopeVuePressConfig;

  resolveThemeConfig(resolvedConfig.themeConfig);
  resolveLocales(resolvedConfig);

  return resolvedConfig;
};
