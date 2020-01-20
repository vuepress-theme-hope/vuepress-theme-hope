/** 导航栏配置 */
export interface NavBarConfigItem {
  /** 导航栏文字 */
  text?: string;
  /** 辅助标签 */
  ariaLabel?: string;
  /** 导航栏链接 */
  link?: string;
  /** 导航栏下拉列表 */
  items?: NavBarConfigItem[];
}

export type NavBarConfig = NavBarConfigItem[] | false;

export interface HopeNavBarConfigItem extends NavBarConfigItem {
  /** 导航栏对应项的图标 */
  icon?: string;
  /** 导航栏的路径前缀 */
  prefix?: string;
}

export type HopeNavBarConfig = HopeNavBarConfigItem[] | false;

/** 侧边栏分组配置 */
export interface SideBarConfigItemObject {
  /** 分组的标题 */
  title: string;

  /** 当前分组的侧边栏项 */
  children: Array<string | SideBarConfigItem>;
  /** 可折叠，默认为 true */
  collapsable?: boolean;
  /** 侧边栏深度，默认为 1 */
  sidebarDepth?: number;
}

export type SideBarConfigItem = string | SideBarConfigItemObject;

export type SideBarConfig =
  | SideBarConfigItem[]
  | Record<string, SideBarConfigItem[]>
  | 'auto'
  | false;

export interface HopeSideBarConfigItemObject extends SideBarConfigItemObject {
  /** 分组的图标 */
  icon?: string;
  /** 当前分组的路径前缀 */
  prefix?: string;
  [props: string]: any;
}

export type HopeSideBarConfigItem = string | HopeSideBarConfigItemObject;

export type HopeSideBarConfig =
  | HopeSideBarConfigItem[]
  | Record<string, HopeSideBarConfigItem[]>
  | 'auto'
  | false;
