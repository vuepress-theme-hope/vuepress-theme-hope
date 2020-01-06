import { deepAssignReverse } from './src/lib/assign';
import defaultConfig from './src/lib/defaultConfig';
import i18n from '@mr-hope/vuepress-shared-utils/src/i18n';
import resolveSideBar from './src/lib/resolveSideBar';

interface ThemeConfig {
  [props: string]: any;
}

interface Config {
  themeConfig: ThemeConfig;
  [props: string]: any;
}

/**
 * 处理主题配置
 *
 * @param themeConfig
 * @param baseLang
 */
const setThemeLocales = (themeConfig: ThemeConfig, baseLang: string): void => {
  /** 默认语言对应的路径 */
  const baseLangPath = i18n.lang2path(baseLang);

  // 设置根目录语言配置
  themeConfig.locales['/'] = {
    ...i18n.getLocale(baseLang),
    ...(themeConfig.locales[baseLangPath] || {}),
    ...(themeConfig.locales['/'] || {})
  };

  // 处理其他语言
  Object.keys(themeConfig.locales).forEach(path => {
    if (path === '/') return;

    const lang = i18n.path2lang(path);

    themeConfig.locales[path] = {
      ...i18n.getLocale(lang),
      ...themeConfig.locales[path]
    };
  });
};

/**
 * 设置侧边栏
 *
 * @param {object} themeConfig 主题设置
 */
const setSideBar = (themeConfig: ThemeConfig): void => {
  // 处理侧边栏
  if (themeConfig.sidebar)
    themeConfig.sidebar = resolveSideBar(themeConfig.sidebar);

  // 处理其它语言的侧边栏
  if (themeConfig.locales)
    Object.keys(themeConfig.locales).forEach(locate => {
      const locateSidebar = themeConfig.locales[locate].sidebar;

      if (locateSidebar)
        if (Array.isArray(locateSidebar))
          themeConfig.locales[locate].sidebar = resolveSideBar(locateSidebar);
        else
          Object.keys(locateSidebar).forEach(property => {
            locateSidebar[property] = resolveSideBar(locateSidebar[property]);
          });
    });
};

/**
 * 处理主题配置
 *
 * @param {object} themeConfig 主题配置
 */
const resolveThemeConfig = (themeConfig: ThemeConfig): void => {
  /** 主目录对应语言 */
  const { baseLang } = themeConfig;

  // 如果主目录启用了未适配的语言，抛出错误
  if (!i18n.langs.includes(baseLang))
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
const setLocales = (config: Config): void => {
  /** 主目录对应语言 */
  const { baseLang } = config.themeConfig;

  // 设置根目录语言配置
  config.locales['/'] = {
    lang: baseLang,
    ...(config.locales['/'] || {})
  };

  // 处理其他语言
  Object.keys(config.themeConfig.locales).forEach(path => {
    if (path === '/') return;

    config.locales[path] = {
      lang: i18n.path2lang(path),
      ...(config.locales[path] || {})
    };
  });
};

/**
 * 处理 vuepress 配置
 *
 * @param {object} config
 */
const resolveConfig = (config: Config): Config => {
  // 合并默认配置
  deepAssignReverse(defaultConfig, config);

  // 处理主题配置
  resolveThemeConfig(config.themeConfig);

  // 设置配置语言
  setLocales(config);

  return config;
};

module.exports = resolveConfig;
