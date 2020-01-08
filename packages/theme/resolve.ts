import { HopeVuepressConfig, ResolvedHopeThemeConfig,ResolvedHopeVuepressConfig } from './src/globals';
import { deepAssignReverse } from './src/lib/assign';
import defaultConfig from './src/lib/defaultConfig';
import { i18n } from '@mr-hope/vuepress-shared-utils';
import resolveHead from './src/lib/resolveHead';
import resolveSideBar from './src/lib/resolveSideBar';

const { checkLang, getLocale,lang2path,path2lang} = i18n;

/**
 * 处理主题配置
 *
 * @param themeConfig
 * @param baseLang
 */
const setThemeLocales = (themeConfig: ResolvedHopeThemeConfig, baseLang: string): void => {
  /** 默认语言对应的路径 */
  const baseLangPath = lang2path(baseLang);

  // 设置根目录语言配置
  themeConfig.locales['/'] = {
    ...getLocale(baseLang),
    ...(themeConfig.locales[baseLangPath] || {}),
    ...(themeConfig.locales['/'] || {})
  };

  // 处理其他语言
  Object.keys(themeConfig.locales).forEach(path => {
    if (path === '/') return;

    const lang = path2lang(path);

    themeConfig.locales[path] = {
      ...getLocale(lang),
      ...themeConfig.locales[path]
    };
  });
};

/**
 * 设置侧边栏
 *
 * @param {object} themeConfig 主题设置
 */
const setSideBar = (themeConfig: ResolvedHopeThemeConfig): void => {
  // 处理侧边栏
  if (themeConfig.sidebar)
    themeConfig.sidebar = resolveSideBar(themeConfig.sidebar);

  // 处理其它语言的侧边栏
  if (themeConfig.locales)
    Object.keys(themeConfig.locales).forEach(locate => {
      const locateSidebar = themeConfig.locales[locate].sidebar;

      if (locateSidebar) themeConfig.locales[locate].sidebar = resolveSideBar(locateSidebar);
    });
};

/**
 * 处理主题配置
 *
 * @param {object} themeConfig 主题配置
 */
const resolveThemeConfig = (themeConfig: ResolvedHopeThemeConfig): void => {
  /** 主目录对应语言 */
  const { baseLang } = themeConfig;

  // 如果主目录启用了未适配的语言，抛出错误
  if (!checkLang(baseLang))
    throw new Error(
      'Base lang not supported. Make a PR to https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/packages/shared-utils/src/i18n/config.ts first!'
    );

  setThemeLocales(themeConfig, baseLang);

  setSideBar(themeConfig);
};

/**
 * 生成对应语言配置
 *
 * @param {object} config vuepress配置
 */
const setLocales = (config: HopeVuepressConfig): void => {
  // 确保存在 locales
  if(!config.locales) config.locales = {};

  /** 主目录对应语言 */
  const { baseLang } = config.themeConfig;

  const { locales }=config;

  // 设置根目录语言配置
  locales['/'] = {
    lang: baseLang,
    ...(locales['/'] || {})
  };

  // 处理其他语言
  Object.keys(config.themeConfig.locales).forEach(path => {
    if (path === '/') return;

    locales[path] = { lang: path2lang(path), ...(locales[path] || {})};
  });
};

/**
 * 处理 vuepress 配置
 *
 * @param {object} config
 */
const resolveConfig = (config: HopeVuepressConfig): ResolvedHopeVuepressConfig => {
  // 合并默认配置
  deepAssignReverse(defaultConfig, config);

  resolveHead(config);

  // 处理主题配置
  resolveThemeConfig(config.themeConfig as ResolvedHopeThemeConfig);

  // 设置配置语言
  setLocales(config);

  return config;
};

export = resolveConfig;
