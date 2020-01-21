import {
  AlgoliaOption,
  NavBarConfig,
  NavBarConfigItem,
  SideBarConfig,
  SideBarConfigItemObject
} from './vuepress-types';

export interface HopeNavBarConfigItem extends NavBarConfigItem {
  /** 导航栏对应项的图标 */
  icon?: string;
  /** 导航栏的路径前缀 */
  prefix?: string;
}

export type HopeNavBarConfig = HopeNavBarConfigItem[] | false;

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

export interface LangLocalesConfig {
  /** 设置该语言的代码 */
  lang: string; // 将会被设置为 <html> 的 lang 属性
  /** 导航栏链接 */
  nav?: NavBarConfig;
  /** 侧边栏配置 */
  sidebar?: SideBarConfig;
  /** 多语言下拉菜单的标题 */
  selectText: string;
  /** 该语言下的更新时间文字 */
  lastUpdated: string;
  /** 该语言在下拉菜单中的标签 */
  label: string;
  /** 辅助标签 */
  ariaLabel?: string;
  /** 编辑链接文字 */
  editLinkText: string; // 默认为 "Edit this page"

  /** algolia 设置 */
  algolia?: AlgoliaOption;
}

export interface HopeLangLocalesConfig extends LangLocalesConfig {
  /** 导航栏链接 */
  nav?: HopeNavBarConfig;
  /** 侧边栏配置 */
  sidebar?: HopeSideBarConfig;
  /** Valine 占位符 */
  valineHolder: string;
  /** 主题色配置 */
  themeColor: {
    themeColor: string;
    nightmode: string[];
  };
  /** 404错误页 */
  error404: {
    /** 错误提示语 */
    text: string[];
    /** 返回主页文字 */
    link: string;
  };
  /** PWA 提示消息 */
  pwa: string;
}
