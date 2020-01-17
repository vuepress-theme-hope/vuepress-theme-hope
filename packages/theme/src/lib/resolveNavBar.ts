/*
 * @Author: Mr.Hope
 * @Date: 2019-10-09 12:09:44
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-17 22:11:10
 * @Description: 侧边栏处理
 */
import {
  HopeNavBarConfig,
  HopeNavBarConfigItem
} from '@mr-hope/vuepress-shared-utils';

/**
 * 处理导航栏
 *
 * @param navBarConfigItem 导航栏的每一项配置
 * @param prefix 路径前缀
 * @return 处理后的该项 navBar 配置
 */
const resolveNavItem = (
  navBarConfigItem: HopeNavBarConfigItem,
  prefix = ''
): HopeNavBarConfigItem => {
  if (typeof navBarConfigItem.link === 'string')
    navBarConfigItem.link = `${prefix}${navBarConfigItem.link}`;

  if (Array.isArray(navBarConfigItem.items)) {
    // 处理每一项 HopeNavBarConfigItem
    navBarConfigItem.items = navBarConfigItem.items.map(item =>
      resolveNavItem(item, `${prefix}${navBarConfigItem.prefix || ''}`)
    );

    if (navBarConfigItem.prefix) delete navBarConfigItem.prefix;
  }

  return navBarConfigItem;
};

const resolveNavBar = (navBarConfig?: HopeNavBarConfig): HopeNavBarConfig => {
  if (!navBarConfig) return false;

  return navBarConfig.map(item => resolveNavItem(item));
};

export default resolveNavBar;
