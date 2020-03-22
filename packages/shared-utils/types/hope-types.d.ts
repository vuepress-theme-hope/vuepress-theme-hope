import {
  AlgoliaOption,
  NavBarConfig,
  NavBarConfigItem,
  SideBarConfig,
  SideBarConfigItemObject
} from './vuepress-types';

/** vuepress-theme-hope 导航栏配置项 */
export interface HopeNavBarConfigItem extends NavBarConfigItem {
  /** 导航栏对应项的图标 */
  icon?: string;
  /** 导航栏的路径前缀 */
  prefix?: string;
  /** 导航栏下拉列表子项 */
  items?: HopeNavBarConfigItem[];
}

/** vuepress-theme-hope 导航栏配置 */
export type HopeNavBarConfig = HopeNavBarConfigItem[] | false;

/** vuepress-theme-hope 侧边栏配置对象 */
export interface HopeSideBarConfigItemObject extends SideBarConfigItemObject {
  /** 分组的图标 */
  icon?: string;
  /** 当前分组的路径前缀 */
  prefix?: string;
  /** 当前侧边栏的子项 */
  children: HopeSideBarConfigItem[];

  [props: string]: any;
}

/** vuepress-theme-hope 侧边栏配置项 */
export type HopeSideBarConfigItem =
  | string
  | string[]
  | HopeSideBarConfigItemObject;

/** vuepress-theme-hope 侧边栏配置 */
export type HopeSideBarConfig =
  | HopeSideBarConfigItem[]
  | Record<string, HopeSideBarConfigItem[]>
  | 'auto'
  | false;

/** 国际化配置 */
export interface LangI18nConfig {
  /** 设置当前语言的代码 */
  lang: string; // 将会被设置为 <html> 的 lang 属性
  /** 多语言下拉菜单的标题 */
  selectText: string;
  /** 该语言下的更新时间文字 */
  lastUpdated: string;
  /** 该语言在下拉菜单中的标签 */
  label: string;
  /** 辅助标签 */
  ariaLabel: string;
  /** 编辑链接文字 */
  editLinkText: string; // 默认为 "Edit this page"
}

/** 多语言配置 */
export type LangLocalesConfig = Partial<LangI18nConfig> & {
  /** 当前语言的导航栏链接 */
  nav?: NavBarConfig;
  /** 当前语言的侧边栏配置 */
  sidebar?: SideBarConfig;
  /** 当前语言的 algolia 设置 */
  algolia?: AlgoliaOption;
};

interface HopeLangI18nConfigItem {
  /** Valine 占位符 */
  valineHolder: string;
  /** 主题色配置 */
  themeColor: {
    /** 颜色提示文字 */
    themeColor: string;
    /** 暗黑模式提示文字 */
    darkmode: string[];
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
  /** 分页多语言配置 */
  pagination: {
    /** 上一页文字 */
    prev: string;
    /** 下一页文字 */
    next: string;
    /** 跳转文字 */
    navigate: string;
    /** 按钮文字 */
    button: string;
    /** 错误文字 */
    errorText: string;
  };
  /** 全部文字 */
  allText: string;
}

/** vuepress-theme-hope 国际化配置 */
export type HopeLangI18nConfig = LangLocalesConfig & HopeLangI18nConfigItem;

/** vuepress-theme-hope 多语言配置 */
export interface HopeLangLocalesConfig
  extends LangLocalesConfig,
    Partial<HopeLangI18nConfigItem> {
  /** 导航栏链接 */
  nav?: HopeNavBarConfig;
  /** 侧边栏配置 */
  sidebar?: HopeSideBarConfig;
  /** 当前语言的 algolia 设置 */
  algolia?: AlgoliaOption;
}

/** 处理过的 vuepress-theme-hope 多语言配置 */
export interface ResolvedHopeLangLocalesConfig extends HopeLangI18nConfig {
  /** 导航栏链接 */
  nav: HopeNavBarConfig;
  /** 侧边栏配置 */
  sidebar: HopeSideBarConfig;
  /** 当前语言的 algolia 设置 */
  algolia?: AlgoliaOption;
}
