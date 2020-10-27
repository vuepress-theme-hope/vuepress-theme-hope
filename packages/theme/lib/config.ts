import { HopeVuepressConfig, ResolvedHopeVuepressConfig } from "../types";
import { deepAssignReverse } from "@mr-hope/vuepress-shared-utils";
import defaultConfig from "./defaultConfig";
import resolveLocales from "./resolveLocales";
import resolveThemeConfig from "./resolveThemeConfig";
import { head } from "@mr-hope/vuepress-plugin-pwa";
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

  resolveThemeConfig(resolvedConfig.themeConfig);
  resolveLocales(resolvedConfig);

  if (resolvedConfig.themeConfig.pwa)
    resolvedConfig.head = head(
      resolvedConfig.themeConfig.pwa,
      config.head,
      config.base || "/"
    );

  return resolvedConfig;
};
