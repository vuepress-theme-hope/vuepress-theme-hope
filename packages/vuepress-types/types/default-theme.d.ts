import type { I18nConfig } from "./config";

/** 导航栏配置项 */
export interface NavBarConfigItem {
  /** 导航栏文字 */
  text: string;
  /** 辅助标签 */
  ariaLabel?: string;
  /** 导航栏链接 */
  link?: string;
  /** 导航栏下拉列表子项 */
  items?: NavBarConfigItem[];
  target?: string;
  rel?: string | false;
}

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
  | "auto"
  | false;

/** Algolia 搜索配置 */
export interface AlgoliaOption {
  appId?: string;
  apiKey: string;
  indexName: string;
  searchParameters?: Record<string, string>;
}

/** 多语言配置 */
export interface DefaultThemeLangI18nConfig extends I18nConfig {
  /** 当前语言的导航栏链接 */
  nav?: NavBarConfig;
  /** 当前语言的侧边栏配置 */
  sidebar?: SideBarConfig;
  /** 当前语言的 algolia 设置 */
  algolia?: AlgoliaOption;
  /** 多语言下拉菜单的标题 */
  selectText?: string;
  /** 该语言下的更新时间文字 */
  lastUpdated?: string;
  /** 该语言在下拉菜单中的标签 */
  label?: string;
  /** 辅助标签 */
  ariaLabel?: string;
  /** 编辑链接文字 */
  editLinkText?: string; // 默认为 "Edit this page"
}

export interface DefaultThemeConfig {
  /** 导航栏 Logo，应为绝对路径 */
  logo?: string;
  /** 导航栏链接 */
  nav?: NavBarConfig;
  /** 是否禁用导航栏 */
  navbar?: boolean;
  /** 侧边栏配置 */
  sidebar?: SideBarConfig;
  /** 侧边栏嵌套的标题深度 */
  sidebarDepth?: number;
  /** 显示所有页面的标题链接 */
  displayAllHeaders?: boolean;
  /** 是否自动更新嵌套的标题链接和 URL 中的 Hash 值 */
  activeHeaderLinks?: boolean;
  /** 是否启用默认的搜索框 */
  search?: boolean;
  /** 搜索框占位符 */
  searchPlaceholder?: string;
  /** 默认搜索框显示的搜索结果数量 */
  searchMaxSuggestions?: number;
  /** Algolia 搜索配置 */
  algolia?: AlgoliaOption;
  /** 最后更新时间前缀 */
  lastUpdated?: string;
  /** 所有页面的 下一篇 链接 */
  nextLinks?: boolean;
  /** 所有页面的 上一篇 链接 */
  prevLinks?: boolean;
  /** 是否启用平滑滚动功能 */
  smoothScroll?: boolean;
  /**
   * 多语言配置选项
   *
   * 键名是该语言所属的子路径
   * 作为特例，默认语言可以使用 '/' 作为其路径。
   */
  locales?: Record<string, DefaultThemeLangI18nConfig>;

  /** 项目仓库地址 */
  repo?: string;
  /** 仓库标签文字 */
  repoLabel?: string;
  /** 文档所属仓库 */
  docsRepo?: string;
  /** 文档所属文件夹 */
  docsDir?: string;
  /** 文档所属分支 */
  docsBranch?: string;
  /** 显示编辑本页链接 */
  editLinks?: boolean;
  /** 编辑本页文字 */
  editLinkText?: string;
}
