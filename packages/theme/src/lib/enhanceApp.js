/* eslint-disable no-unused-vars */
/*
 * @Author: Mr.Hope
 * @Date: 2019-07-05 00:15:31
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-21 14:12:30
 * @Description: Vuepress增强配置
 */
import assign from './assign';
import defaultConfig from './defaultConfig';
import resolveSideBar from './resolve-sideBar';

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  /** 主题配置 */
  const { themeConfig } = siteData;

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

  assign(defaultConfig, themeConfig);
};
