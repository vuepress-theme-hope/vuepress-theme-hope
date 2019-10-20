/*
 * @Author: Mr.Hope
 * @Date: 2019-10-09 12:09:44
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-20 13:32:19
 * @Description: 侧边栏处理
 */

/**
 * @description: 处理导航栏
 * @param {string | object}  sidebarConfig 侧边栏配置
 * @param {string}  prefix 路径前缀
 * @return 处理后的 sideBar 配置
 */
const resolveSideBar = (sidebarConfig, prefix = '') =>
  sidebarConfig.map(element => {
    if (typeof element === 'string') return `${prefix}${element}`;
    if (
      (typeof element === 'object' || typeof element === 'function') &&
      element.children
    ) {
      if (Array.isArray(element.children)) {
        element.children = resolveSideBar(
          element.children,
          `${prefix}${element.prefix || ''}`
        );
        delete element.prefix;
      }

      return { ...element };
    }

    return undefined;
  });

module.exports = resolveSideBar;
