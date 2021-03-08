import { PageInfotype } from "@mr-hope/vuepress-plugin-comment";
import { Langs } from "@mr-hope/vuepress-shared";
import {
  AlgoliaOption,
  I18nConfig,
  NavBarConfigItem,
  SideBarConfigItemObject,
} from "@mr-hope/vuepress-types";
import { HopeLangLocalesConfig } from "./locale";
import { HopeThemePluginConfig } from "./plugin";

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

/**
 * 合法的媒体
 *
 * media you can choose
 */
type BlogMedia =
  | "Baidu"
  | "Bitbucket"
  | "Dingding"
  | "Discord"
  | "Dribbble"
  | "Evernote"
  | "Facebook"
  | "Flipboard"
  | "Gitee"
  | "Github"
  | "Gitlab"
  | "Gmail"
  | "Instagram"
  | "Lines"
  | "Linkedin"
  | "Pinterest"
  | "Pocket"
  | "QQ"
  | "Qzone"
  | "Reddit"
  | "Rss"
  | "Steam"
  | "Twitter"
  | "Wechat"
  | "Weibo"
  | "Whatsapp"
  | "Youtube"
  | "Zhihu";

/**
 * 博客选项
 *
 * Blog configuration
 */
export type BlogOptions = {
  /**
   * 博主名称
   *
   * Name of the Blogger, default is author
   */
  name?: string;
  /**
   * 博主头像，应为绝对路径
   *
   * Blogger avator, must be an absolute path
   */
  avatar?: string;
  /**
   * 是否剪裁头像为圆形形状
   *
   * Whether cliping the avatar with round shape
   *
   * @default true
   */
  roundAvatar?: boolean;
  /**
   * 是否在侧边栏展示博主信息
   *
   * Whether to display blogger info in sidebar
   *
   * @default 'none'
   */
  sidebarDisplay?: "mobile" | "none" | "always";
  /**
   * 博主的个人介绍地址
   *
   * Intro page about blogger
   */
  intro?: string;
  /**
   * 媒体链接配置
   *
   * Media links configuration
   *
   * E.g.
   *
   * ```js
   * {
   *   QQ: "http://wpa.qq.com/msgrd?v=3&uin=1178522294&site=qq&menu=yes",
   *   Qzone: "https://1178522294.qzone.qq.com/",
   *   Gmail: "mailto:zhangbowang1998@gmail.com",
   *   Zhihu: "https://www.zhihu.com/people/mister-hope",
   *   Steam: "https://steamcommunity.com/id/Mr-Hope/",
   *   Weibo: "https://weibo.com/misterhope",
   * }
   * ```
   */
  links?: Partial<Record<BlogMedia, string>>;
  /**
   * 时间轴自定义文字
   *
   * Custom text for timeline
   *
   * @default 'Yesterday once more'
   */
  timeline?: string;
  /**
   * 每页的文章数量
   *
   * Article number per page
   *
   * @default 10
   */
  perPage?: number;
};

/**
 * 页脚配置
 *
 * Footer Settings
 */
export interface HopeFooterConfig {
  /**
   * 页脚的默认内容，可输入 HTMLString
   *
   * The default content for the footer, can accept HTMLString.
   */
  content?: string;
  /**
   * 默认的版权信息，设置为 `false` 来默认禁用它
   *
   * The default copyright info, set it to `false` to disable it by default.
   */
  copyright?: string | false;
  /**
   * 是否默认显示页脚
   *
   * Whether to display footer by default
   *
   * @default false
   */
  display?: boolean;
}

/**
 * 加密选项
 *
 * Encrypt Options
 */
export interface EncryptOptions {
  /**
   * 功能状态
   *
   * - `'global'` 意味着全局启用
   * - `'local'` 意味着全局禁用，可在页面内启用
   *
   * Feature Status
   *
   * - `'global'` means enabled globally
   * - `'local'` means disabled globally and can be enabled in pages
   *
   * @default 'local'
   */
  status?: "global" | "local";
  /**
   * 最高权限密码
   *
   * Global passwords, which has the highest authority
   */
  global?: string | string[];
  /**
   * 加密配置
   *
   * ```json
   * {
   *   // 这会加密整个 guide 目录，并且两个密码都是可用的
   *   "/guide/": ["1234", "5678"],
   *   // 这只会加密 config/page.html
   *   "/config/page.html": "1234"
   * }
   * ```
   *
   * Encrypt Configuration
   *
   * E.g.:
   *
   * ```json
   * {
   *   // This will encrypt the entire guide directory and both passwords will be available
   *   "/guide/": ["1234", "5678"],
   *   // this will only encrypt config/page.html
   *   "/config/page.html": "1234"
   * }
   * ```
   */
  config?: Record<string, string | string[]>;
}

/**
 * 项目配置
 *
 * Project Configuration
 */
export interface ProjectOptions {
  /**
   * 项目类型
   *
   * Type of project
   */
  type: "article" | "book" | "link" | "project";
  /**
   * 项目名称
   *
   * Project name
   */
  name: string;
  /**
   * 项目描述
   *
   * Project desription
   */
  desc?: string;
  /**
   * 项目封面，应为绝对路径
   *
   * Cover for the project, must be an absolute path
   */
  cover?: string;
  /**
   * 项目链接
   *
   * Link of the project
   */
  link: string;
}

interface HopeThemeAppearanceConfig {
  /**
   * Algolia 搜索类型
   *
   * Algolia Search Type
   *
   * @default 'dropdown'
   */
  algoliaType?: "dropdown" | "full";
  /**
   * 是否在桌面模式显示锚点标题
   *
   * Whether display anchor in desktop mode
   *
   * @default true
   */
  anchorDisplay?: boolean;

  /**
   * 图标前缀
   *
   * Prefix of icon class
   *
   * @default 'icon-'
   */
  iconPrefix?: string;

  /**
   * 每分钟的阅读字数
   *
   * Reading speed of word per minute
   *
   * @default 300
   */
  wordPerminute?: number;

  /**
   * 是否在侧边栏显示图标
   *
   * Whether display icon in sidebar
   *
   * @default true
   */
  sidebarIcon?: boolean;

  /**
   * 是否全局启用路径导航
   *
   * Whether enable breadcrumb globally
   *
   * @default true
   */
  breadcrumb?: boolean;

  /**
   * 是否在路径导航显示图标
   *
   * Whether display icon in breadcrumb
   *
   * @default true
   */
  breadcrumbIcon?: boolean;

  /**
   * 是否启用平滑滚动
   *
   * Enable smooth scrolling feature
   *
   * @default true
   */
  smoothScroll?: boolean;

  /**
   * 是否显示返回顶部按钮
   *
   * 如果设置为数字，则该数字为触发临界值
   *
   * Wether display backto top button
   *
   * If it’s set with a number, then it will be the threshold
   *
   * @default true
   */
  backToTop?: boolean | number;

  /**
   * 是否在导航栏显示仓库链接
   *
   * @default true
   */
  repoDisplay?: boolean;

  /**
   * 是否显示 ”全屏“ 按钮
   *
   * @default true
   */
  fullscreen?: boolean;
}

/** vuepress-theme-hope 主题配置 */
export interface HopeThemeConfig
  extends HopeThemePluginConfig,
    HopeThemeAppearanceConfig {
  /** 导航栏 Logo，应为绝对路径 */
  logo?: string;
  /**
   * 暗黑模式下 logo
   *
   * Logo Image under darkmode
   */
  darkLogo?: string;
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
  /** 所有页面的 下一篇 链接 */
  nextLinks?: boolean;
  /** 所有页面的 上一篇 链接 */
  prevLinks?: boolean;
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
  /** 显示贡献者 */
  contributor?: boolean;
  /** 显示编辑本页链接 */
  editLinks?: boolean;
  /** 显示更新时间 */
  updateTime?: boolean;
  /**
   * 多语言配置
   *
   * i18n config
   */
  locales?: Record<string, I18nConfig & HopeLangLocalesConfig>;
  /**
   * 根目录对应的语言
   *
   * The language of the home directory
   *
   * @default 'en-US'
   */
  baseLang?: Langs;

  /** 站点地址 */
  hostname?: string;

  /**
   * 文章显示的默认作者
   *
   * The default author of the article
   */
  author?: string;

  /**
   * 导航栏配置
   *
   * Navbar configuration
   */
  nav?: HopeNavBarConfig;
  /**
   * 是否在向下滚动时自动隐藏导航栏
   *
   * Whether to hide navbar when scrolling down
   *
   * @default 'mobile'
   */
  navAutoHide?: "always" | "mobile" | "none";
  /** 是否禁用导航栏 */
  navbar?: boolean;
  /**
   * 侧边栏配置
   *
   * Sidebar configuration
   */
  sidebar?: HopeSideBarConfig;
  /** 侧边栏嵌套的标题深度 */
  sidebarDepth?: number;

  /**
   * 深色模式支持选项:
   * - `'auto-switch'`: "关闭 | 自动 | 打开" 的三段式开关 (默认)
   * - `'switch'`: "关闭 | 打开" 的切换式开关
   * - `'auto'`: 自动根据用户设备主题或当前时间决定是否应用深色模式
   * - `'disable'`: 禁用深色模式
   *
   * Dark mode support options:
   *
   * - `'auto-switch'`: "off | automatic | on" three-stage switch (Default)
   * - `'switch'`: "Close | Open" toggle switch
   * - `'auto'`: Automatically decide whether to apply dark mode based on user device’s color-scheme or current time
   * - `'disable'`: disable dark mode
   *
   * @default 'auto-switch'
   */
  darkmode?: "auto-switch" | "auto" | "switch" | "disable";
  /**
   * 主题色选项配置。
   *
   * Theme color configuration.
   *
   * E.g.:
   * ```js
   * {
   *   blue: '#2196f3',
   *   red: '#f26d6d',
   *   green: '#3eaf7c',
   *   orange: '#fb9b5f'
   * }
   * ```
   *
   * @default { blue: '#2196f3', red: '#f26d6d', green: '#3eaf7c', orange: '#fb9b5f' }
   */
  themeColor?: Record<string, string> | false;

  /**
   * 博客设置
   *
   * Blog configuration
   */
  blog?: BlogOptions | false;

  /**
   * 页面信息
   *
   * Article information
   *
   * Avaliable Options:
   *
   * - `'author'`: Author
   * - `'time'`: Writing Date
   * - `'category'`: Category
   * - `'tag'`: Tags
   * - `'reading-time'`: Expect reading time
   * - `'word'`: Word number for the article
   * - `'visitor'`: Visitor Number
   *
   * @default ['author', 'visitor', 'time', 'category', 'tag', 'reading-time']
   */
  pageInfo?: PageInfotype[] | false;

  /**
   * 页脚配置
   *
   * Footer Configuration
   */
  footer?: HopeFooterConfig;

  /**
   * 加密设置
   *
   * Encrypt Configuration
   */
  encrypt?: EncryptOptions;
}

/** 处理后的 vuepress-theme-hope 主题配置 */
export interface ResolvedHopeThemeConfig extends HopeThemeConfig {
  /** 根目录对应的语言 */
  baseLang: Langs;
  /** 侧边栏深度 */
  sidebarDepth: number;
  /** 图标 FontClass 前缀 */
  iconPrefix: string;
  /** 多语言配置 */
  locales: Record<string, I18nConfig & HopeLangLocalesConfig>;
  /** 页脚配置 */
  footer: HopeFooterConfig;
  /** 显示编辑本页链接 */
  editLinks: boolean;
}
