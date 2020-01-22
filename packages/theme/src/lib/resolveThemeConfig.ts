import { ResolvedHopeThemeConfig } from '../../typings';
import { i18n } from '@mr-hope/vuepress-shared-utils';
import resolveEncrypt from './resolveEncrypt';
import resolveNavBar from './resolveNavBar';
import resolveSideBar from './resolveSideBar';

const { checkLang, getLocale, lang2path, path2lang } = i18n;

/**
 * 处理主题配置
 *
 * @param themeConfig
 * @param baseLang
 */
const setThemeLocales = (
  themeConfig: ResolvedHopeThemeConfig,
  baseLang: string
): void => {
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
 * @param themeConfig 主题设置
 */
const setNavBarandSideBar = (themeConfig: ResolvedHopeThemeConfig): void => {
  // 处理导航栏
  themeConfig.nav = resolveNavBar(themeConfig.nav);

  // 处理侧边栏
  themeConfig.sidebar = resolveSideBar(themeConfig.sidebar);

  // 处理其它语言的导航栏与侧边栏
  if (themeConfig.locales)
    Object.keys(themeConfig.locales).forEach(locate => {
      const locateNavbar = themeConfig.locales[locate].nav;
      const locateSidebar = themeConfig.locales[locate].sidebar;

      if (locateNavbar)
        themeConfig.locales[locate].nav = resolveNavBar(locateNavbar);
      if (locateSidebar)
        themeConfig.locales[locate].sidebar = resolveSideBar(locateSidebar);
    });
};

/**
 * 处理主题配置
 *
 * @param themeConfig 主题配置
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

  setNavBarandSideBar(themeConfig);

  if (themeConfig.encrypt) resolveEncrypt(themeConfig.encrypt);
};

export default resolveThemeConfig;
