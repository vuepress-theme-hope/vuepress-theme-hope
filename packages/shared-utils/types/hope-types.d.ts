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

/** 阅读时间 */
interface ReadingTime {
  minutes: number;
  words: number;
}

interface HopeLangI18nConfigItem {
  /** Valine 占位符 */
  valineHolder: string;
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
  /** 博客设置 */
  blog: {
    /** 文章文字 */
    article: string;
    /** 文章列表文字 */
    articleList: string;
    /** 作者 */
    author: string;
    /** 写作日期 */
    time: string;
    /** 访问量 */
    views: string;
    /** 标签文字 */
    tag: string;
    /** 分类文字 */
    category: string;
    /** 时间轴文字 */
    timeline: string;
    /** 时间轴显示文字 */
    timelineText: string;
    /** 阅读时间 */
    readingTime: string;
    /** 文章字数 */
    words: string;
    /** 全部文字 */
    allText: string;
  };
  /** 阅读时间 */
  readingTime: {
    /** 字数 */
    word: string;
    /** 一分钟阅读 */
    minute: string;
    /** 时间 */
    time: string;
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

/** 处理过的 vuepress-theme-hope 多语言配置 */
export interface ResolvedHopeLangLocalesConfig extends HopeLangI18nConfig {
  /** 导航栏链接 */
  nav: HopeNavBarConfig;
  /** 侧边栏配置 */
  sidebar: HopeSideBarConfig;
  /** 当前语言的 algolia 设置 */
  algolia?: AlgoliaOption;
}
