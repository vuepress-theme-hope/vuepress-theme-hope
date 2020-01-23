import { HopeVuepressConfig, ResolvedHopeVuepressConfig } from './typings';
import { deepAssignReverse } from '@mr-hope/vuepress-shared-utils';
import defaultConfig from './src/lib/defaultConfig';
import resolveHead from './src/lib/resolveHead';
import resolveLocales from './src/lib/resolveLocales';
import resolveThemeConfig from './src/lib/resolveThemeConfig';

/**
 * 处理 vuepress 配置
 *
 * @param {object} config
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
