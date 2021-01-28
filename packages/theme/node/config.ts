import { deepAssignReverse } from "@mr-hope/vuepress-shared";
import { defaultConfig } from "./defaultConfig";
import { resolveLocales } from "./locales";
import { resolveThemeConfig } from "./themeConfig";

import type { HopeVuePressConfig, ResolvedHopeVuePressConfig } from "../types";

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
