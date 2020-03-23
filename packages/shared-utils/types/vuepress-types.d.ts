/** 导航栏配置项 */
export type NavBarConfigItem = {
  /** 导航栏文字 */
  text: string;
  /** 辅助标签 */
  ariaLabel?: string;
  /** 导航栏链接 */
  link?: string;
  /** 导航栏下拉列表子项 */
  items?: NavBarConfigItem[];
};

/** 导航栏配置 */
export type NavBarConfig = NavBarConfigItem[] | false;

/** 侧边栏分组配置对象 */
export interface SideBarConfigItemObject {
  /** 分组的标题 */
  title: string;

  /** 当前侧边栏的子项 */
  children: SideBarConfigItem[];
  /** 可折叠，默认为 true */
  collapsable?: boolean;
  /** 侧边栏深度，默认为 1 */
  sidebarDepth?: number;
}

/** 侧边栏配置项 */
export type SideBarConfigItem = string | string[] | SideBarConfigItemObject;

/** 侧边栏配置 */
export type SideBarConfig =
  | SideBarConfigItem[]
  | Record<string, SideBarConfigItem[]>
  | 'auto'
  | false;

/** Algolia 搜索配置 */
export interface AlgoliaOption {
  apiKey: string;
  indexName: string;
}
