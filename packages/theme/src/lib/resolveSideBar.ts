/*
 * @Author: Mr.Hope
 * @Date: 2019-10-09 12:09:44
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-01 22:42:18
 * @Description: 侧边栏处理
 */

/** 侧边栏分组配置 */
interface SideBarConfigObject {
  /** 分组的标题 */
  title: string;
  /** 分组的图标 */
  icon?: string;
  /** 当前分组的路径前缀 */
  prefix?: string;
  /** 当前分组的侧边栏项 */
  children: Array<string|SideBarConfig>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [props: string]: any;
}

type SideBarConfig = string | SideBarConfigObject;

/**
 * 处理导航栏
 *
 * @param sidebarConfig 侧边栏配置
 * @param prefix 路径前缀
 * @return 处理后的 sideBar 配置
 */
const resolveSideBarItem = (
  sidebarConfig: SideBarConfig[],
  prefix = ''
): SideBarConfig[] =>
  sidebarConfig.map(element=> {
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
        delete element.prefix;
      }

      return { ...element };
    }

    return undefined;
  })as SideBarConfig[];

const resolveSideBar = (
  sideBarConfig: SideBarConfigObject | SideBarConfig[]
): SideBarConfig | SideBarConfig[] => {
  if (Array.isArray(sideBarConfig)) return resolveSideBarItem(sideBarConfig);

  const resolvedConfig= {} as SideBarConfigObject ;

  Object.keys(sideBarConfig).forEach(property => {
    resolvedConfig[property] = resolveSideBarItem(sideBarConfig[property]);
  });

  return resolvedConfig;
};

export default resolveSideBar;
