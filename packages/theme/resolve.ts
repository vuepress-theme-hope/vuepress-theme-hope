import { HopeVuepressConfig, ResolvedHopeVuepressConfig } from './typings';
import { deepAssignReverse, i18n } from '@mr-hope/vuepress-shared-utils';
import defaultConfig from './src/lib/defaultConfig';
import resolveHead from './src/lib/resolveHead';
import resolveThemeConfig from './src/lib/resolveThemeConfig';

const { path2lang } = i18n;

/**
 * 生成对应语言配置
 *
 * @param {object} config vuepress配置
 */
const setLocales = (config: ResolvedHopeVuepressConfig): void => {
  // 确保存在 locales
  if (!config.locales) config.locales = {};

  /** 主目录对应语言 */
  const { baseLang } = config.themeConfig;

  const { locales } = config;

  // 设置根目录语言配置
  locales['/'] = {
    lang: baseLang,
    ...(locales['/'] || {})
  };

  // 处理其他语言
  Object.keys(config.themeConfig.locales).forEach(path => {
    if (path === '/') return;

    locales[path] = { lang: path2lang(path), ...(locales[path] || {}) };
  });
};

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

  setLocales(resolvedConfig);

  return resolvedConfig;
};

export = resolveConfig;
