/* eslint-disable no-unused-vars */
/*
 * @Author: Mr.Hope
 * @Date: 2019-07-05 00:15:31
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-23 21:14:32
 * @Description: Vuepress增强配置
 */
import assign from './assign';
import defaultConfig from './defaultConfig';
import { i18n } from '@mr-hope/vuepress-shared-utils';
import resolveSideBar from './resolve-sideBar';

// eslint-disable-next-line max-lines-per-function
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  /** 主题配置 */
  const { themeConfig } = siteData;

  // 复制默认配置
  assign(defaultConfig, themeConfig);

  /** 主目录对应语言 */
  const { baseLang } = themeConfig;

  // 如果主目录启用了未适配的语言，警告
  if (!i18n.lang.includes(baseLang))
    throw new Error('Base lang not supported. Make a PR first!');

  /** 默认语言对应的路径 */
  const baseLangPath = i18n.lang2path[themeConfig.baseLang];

  // 设置根目录语言配置
  themeConfig.locales['/'] = {
    ...(i18n.config.locales[baseLang] || {}),
    ...(themeConfig.locales[baseLangPath] || {}),
    ...(themeConfig.locales['/'] || {})
  };

  // 处理其他语言
  Object.keys(themeConfig.locales).forEach(path => {
    if (path === '/') return;

    const lang = i18n.path2lang[path];

    themeConfig.locales[path] = {
      ...(i18n.config.locales[lang] || {}),
      ...themeConfig.locales[path]
    };
  });

  // 处理侧边栏
  if (themeConfig.sidebar)
    if (Array.isArray(themeConfig.sidebar))
      themeConfig.sidebar = resolveSideBar(themeConfig.sidebar);
    else
      Object.keys(themeConfig.sidebar).forEach(property => {
        themeConfig.sidebar[property] = resolveSideBar(
          themeConfig.sidebar[property]
        );
      });

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
