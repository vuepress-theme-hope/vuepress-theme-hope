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

/** 侧边栏分组配置 */
export interface SideBarConfigItemObject {
  /** 分组的标题 */
  title: string;

  /** 当前分组的侧边栏项 */
  children: SideBarConfigItem[];
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

export interface AlgoliaOption {
  apiKey: string;
  indexName: string;
}
