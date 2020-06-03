import { CommentOptions, PageInfotype } from "@mr-hope/vuepress-plugin-comment";
import {
  HopeLangLocalesConfig,
  HopeNavBarConfig,
  HopeSideBarConfig,
} from "@mr-hope/vuepress-shared-utils";
import { DefaultThemeConfig, SiteConfig } from "@mr-hope/vuepress-types";
import { MarkdownEnhanceOption } from "vuepress-plugin-md-enhance/types";
import { PWAOptions } from "@mr-hope/vuepress-plugin-pwa";
import { SeoOptions } from "@mr-hope/vuepress-plugin-seo";
import { SitemapOptions } from "@mr-hope/vuepress-plugin-sitemap";

/**
 * 合法的媒体
 *
 * media you can choose
 */
type BlogMedia =
  | "Baidu"
  | "Dingding"
  | "Dribbble"
  | "Evernote"
  | "Facebook"
  | "Flipboard"
  | "Github"
  | "Gmail"
  | "Instagram"
  | "Line"
  | "Linkedin"
  | "Pinterest"
  | "Pocket"
  | "QQ"
  | "Qzone"
  | "Rss"
  | "Steam"
  | "Taobao"
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
   * 是否在侧边栏展示博主信息
   *
   * Whether to display blogger info in sidebar
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
   */
  timeline?: string;
  /**
   * 项目配置
   *
   * Project Configuration
   */
  project?: ProjectOptions[];
  /**
   * 每页的文章数量
   *
   * Article number per page
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
   */
  display?: boolean;
}

/**
 * 版权设置
 *
 * Copyright Settings
 */
export interface HopeCopyrightConfig {
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
   */
  status: "global" | "local";
  /**
   * 触发版权信息或禁止复制动作的最少字符数
   *
   * The minimum text length that triggers the clipboard component or the noCopy effect
   */
  minLength?: number;
  /**
   * 是否禁止复制
   *
   * Whether to prohibit copying.
   */
  noCopy?: boolean;
  /**
   * 是否禁止选中文字
   *
   * Whether to prohibit selecting.
   */
  noSelect?: boolean;
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
   * - `'local'` 意味着全局禁用，可在页面内启用 (默认)
   *
   * Feature Status
   *
   * - `'global'` means enabled globally
   * - `'local'` means disabled globally and can be enabled in pages (Default)
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

/** vuepress-theme-hope 主题配置 */
export interface HopeThemeConfig extends DefaultThemeConfig {
  lastUpdated?: never;
  editLinkText?: never;
  /**
   * 暗黑模式下 logo
   *
   * Logo Image under darkmode
   */
  darkLogo?: string;
  /**
   * 多语言配置
   *
   * i18n config
   */
  locales?: Record<string, HopeLangLocalesConfig>;
  /**
   * 根目录对应的语言
   *
   * The language of the home directory
   */
  baseLang?: string;
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
   * 侧边栏配置
   *
   * Sidebar configuration
   */
  sidebar?: HopeSideBarConfig;
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
   * - `'auto'`: Automatically decide whether to apply dark mode based on user device's color-scheme or current time
   * - `'disable'`: disable dark mode
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
   */
  themeColor?: Record<string, string> | false;
  /**
   * 博客设置
   *
   * Blog configuration
   */
  blog?: BlogOptions | false;
  /**
   * PWA 设置
   *
   * PWA configuration
   */
  pwa?: PWAOptions | false;
  /** 页面信息 */
  pageInfo?: PageInfotype[] | false;
  /**
   * Markdown 增强设置
   *
   * Markdown enhance configuration
   */
  markdown?: MarkdownEnhanceOption | false;
  /**
   * 评论设置
   * @see http://comment.mrhope.site/config/
   *
   * Comment Configuration
   * @see http://comment.mrhope.site/en/config/
   */
  comment?: CommentOptions | false;
  /**
   * 页脚配置
   *
   * Footer Configuration
   */
  footer?: HopeFooterConfig;
  /**
   * 版权设置
   *
   * Copyright Configuration
   */
  copyright?: HopeCopyrightConfig;

  /**
   * 加密设置
   *
   * Encrypt Configuration
   */
  encrypt?: EncryptOptions;
  /** 站点地址 */
  hostname?: string;
  /** 最后更新时间转换 */
  lastUpdatedTransformer?: (timestamp: number, lang: string) => string;
  /** SEO */
  seo?: SeoOptions | false;
  /** Sitemap */
  sitemap?: SitemapOptions | false;
  /**
   * ts-loader 选项
   *
   * Options which will passed to ts-loader
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tsLoader?: Record<string, any>;
  /** 图标前缀 */
  iconPrefix?: string;
  /** 是否在侧边栏显示图标 */
  sidebarIcon?: boolean;
  /** 是否全局启用路径导航 */
  breadcrumb?: boolean;
  /** 是否在路径导航显示图标 */
  breadcrumbIcon?: boolean;
  /** 是否启用平滑滚动 */
  smoothScroll?: boolean;
  /** 是否开启图片预览 */
  photoSwipe?: boolean;
  /** 是否显示返回顶部按钮 */
  backToTop?: boolean;
  /** 是否在导航栏显示仓库链接 */
  repoDisplay?: boolean;
  /** 时间轴自定义文字 */
  timeline?: string;
  /** 是否显示 ”全屏“ 按钮 */
  fullscreen?: boolean;
}

/** 处理后的 vuepress-theme-hope 主题配置 */
export interface ResolvedHopeThemeConfig extends HopeThemeConfig {
  /** 根目录对应的语言 */
  baseLang: string;
  /** 侧边栏深度 */
  sidebarDepth: number;
  /** 图标 FontClass 前缀 */
  iconPrefix: string;
  /** 多语言配置 */
  locales: Record<string, HopeLangLocalesConfig>;
  /** 页脚配置 */
  footer: HopeFooterConfig;
  /** 显示编辑本页链接 */
  editLinks: boolean;
}

/** 头部选项配置 */
export type HopeHeadOptionConfig = Partial<{
  /** 网站的图标 */
  icon: string;
  /** PWA 设置 */
  pwa: Partial<{
    /** manifest 文件的路径 */
    manifest: string;
    /** 主题色 */
    themeColor: string;
    /** 苹果导航栏颜色 */
    appleStatusBarColor: "black" | "white";
    /** 苹果的图标 */
    appleIcon: string;
    /** 微软磁贴图片 */
    msTileImage: string;
    /** 微软磁贴颜色 */
    msTileColor: string;
  }>;
}>;

/** vuepress-theme-hope 项目配置 */
export interface HopeVuepressConfig extends SiteConfig {
  /** 自定义主题的配置 */
  themeConfig: HopeThemeConfig;
  /** 构建头部选项 */
  headOption?: HopeHeadOptionConfig;
}

/** 处理过的 vuepress-theme-hope 项目配置 */
export interface ResolvedHopeVuepressConfig extends HopeVuepressConfig {
  /** 使用的自定义主题 */
  theme: "hope";
  /** 自定义主题的配置 */
  themeConfig: ResolvedHopeThemeConfig;
  /** 构建头部选项 */
  headOption?: HopeHeadOptionConfig;
}
