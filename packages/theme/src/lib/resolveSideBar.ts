/*
 * @Author: Mr.Hope
 * @Date: 2019-10-09 12:09:44
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-13 22:27:42
 * @Description: 侧边栏处理
 */
import {
  HopeSideBarConfig,
  HopeSideBarConfigItem
} from '@mr-hope/vuepress-shared-utils';

/**
 * 处理导航栏
 *
 * @param sidebarConfig 侧边栏配置
 * @param prefix 路径前缀
 * @return 处理后的 sideBar 配置
 */
const resolveSideBarItem = (
  sidebarConfig: HopeSideBarConfigItem[],
  prefix = ''
): HopeSideBarConfigItem[] =>
  sidebarConfig.map(element => {
    if (typeof element === 'string') return `${prefix}${element}`;
    if (
      (typeof element === 'object' || typeof element === 'function') &&
      element.children
    ) {
      if (Array.isArray(element.children)) {
        element.children = resolveSideBarItem(
          element.children,
          `${prefix}${element.prefix || ''}`
        );

        if (element.prefix) delete element.prefix;
      }

      return { ...element };
    }

    throw new Error('Check your sideBar config, it is illegal');
  });

const resolveSideBar = (
  sideBarConfig?: HopeSideBarConfig
): HopeSideBarConfig => {
  // false undefined 与 'auto' 无需处理
  if (sideBarConfig === false || typeof sideBarConfig === 'undefined')
    return false;
  if (sideBarConfig === 'auto') return 'auto';

  if (Array.isArray(sideBarConfig)) return resolveSideBarItem(sideBarConfig);

  const resolvedConfig: Record<string, HopeSideBarConfigItem[]> = {};

  Object.keys(sideBarConfig).forEach(property => {
    resolvedConfig[property] = resolveSideBarItem(sideBarConfig[property]);
  });

  return resolvedConfig;
};

export default resolveSideBar;
