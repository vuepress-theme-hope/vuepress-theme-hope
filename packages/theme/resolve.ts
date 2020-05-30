import { HopeVuepressConfig, ResolvedHopeVuepressConfig } from "./types";
import { deepAssignReverse } from "@mr-hope/vuepress-shared-utils";
import defaultConfig from "./lib/defaultConfig";
import resolveHead from "./lib/resolveHead";
import resolveLocales from "./lib/resolveLocales";
import resolveThemeConfig from "./lib/resolveThemeConfig";

/**
 * 处理 vuepress 配置
 *
 * @param config
 */
const resolveConfig = (
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

export = resolveConfig;
