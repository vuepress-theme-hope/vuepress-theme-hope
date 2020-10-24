import {
  AlgoliaOption,
  DefaultThemeLangI18nConfig,
  NavBarConfigItem,
  SideBarConfigItemObject,
} from "@mr-hope/vuepress-types";

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  | "auto"
  | false;

interface HopeLangI18nConfigItem {
  /** 主题色配置 */
  themeColor: {
    /** 颜色提示文字 */
    themeColor: string;
    /** 主题模式提示文字 */
    themeMode: string;
  };
  /** 404错误页 */
  error404: {
    /** 错误提示语 */
    hint: string[];
    /** 返回主页文字 */
    home: string;
    /** 返回上一页文字 */
    back: string;
  };
  /** 博客设置 */
  blog: {
    /** 文章文字 */
    article: string;
    /** 文章列表文字 */
    articleList: string;
    /** 分类文字 */
    category: string;
    /** 标签文字 */
    tag: string;
    /** 时间轴文字 */
    timeline: string;
    /** 时间轴显示文字 */
    timelineText: string;
    /** 全部文字 */
    allText: string;
  };
}

/** vuepress-theme-hope 国际化配置 */
export type HopeLangI18nConfig = DefaultThemeLangI18nConfig &
  HopeLangI18nConfigItem;

/** vuepress-theme-hope 多语言配置 */
export interface HopeLangLocalesConfig
  extends DefaultThemeLangI18nConfig,
    Partial<HopeLangI18nConfigItem> {
  /** 导航栏链接 */
  nav?: HopeNavBarConfig;
  /** 侧边栏配置 */
  sidebar?: HopeSideBarConfig;
  /** 当前语言的 algolia 设置 */
  algolia?: AlgoliaOption;
  /** 时间轴文字 */
  timeline?: string;
}

export interface ComponentI18NConfig {
  /** 返回顶部文字 */
  backToTop: string;
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
}

export interface CopyCodeI18NConfig {
  /** 复制文字 */
  copy: string;
  /** 提示文字 */
  hint: string;
}

export interface PageInfoI18nConfig {
  /** 作者 */
  author: string;
  /** 写作日期 */
  time: string;
  /** 原创文字 */
  origin: string;
  /** 访问量 */
  views: string;
  /** 标签文字 */
  tag: string;
  /** 分类文字 */
  category: string;
  /** 阅读时间 */
  readingTime: string;
  /** 文章字数 */
  words: string;
}

export interface PWAI18NConfig {
  /** 安装文字 */
  install: string;
  /** iOS 安装文字 */
  iOSInstall: string;
  /** 取消文字 */
  cancel: string;
  /** 安装解释 */
  explain: string;
  /** 描述 */
  desc: string;
  /** 特性文字 */
  feature: string;
  /** 更新内容文字 */
  update: string;
}

export interface ReadingTimeI18NConfig {
  /** 字数模板 */
  word: string;
  /** 小于一分钟文字 */
  minute: string;
  /** 时间模板 */
  time: string;
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
