import { HopeVuepressConfig, ResolvedHopeVuepressConfig } from "../types";
import { deepAssignReverse } from "@mr-hope/vuepress-shared-utils";
import defaultConfig from "./defaultConfig";
import resolveHead from "./resolveHead";
import resolveLocales from "./resolveLocales";
import resolveThemeConfig from "./resolveThemeConfig";

/**
 * 处理 vuepress 配置
 *
 * @param config
 */
export const config = (
  config: HopeVuepressConfig
): ResolvedHopeVuepressConfig => {
  // 合并默认配置
  deepAssignReverse(defaultConfig, config);

  const resolvedConfig = config as ResolvedHopeVuepressConfig;

  resolveHead(resolvedConfig);
  resolveThemeConfig(resolvedConfig.themeConfig);
  resolveLocales(resolvedConfig);

  return resolvedConfig;
};
