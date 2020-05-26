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

/** 页脚配置 */
export interface HopeFooterConfig {
  /** 页脚的默认文字 */
  content?: string;
  /** 默认的版权信息 */
  copyright?: string;
  /** 是否默认显示页脚 */
  display?: boolean;
}

/** 加密选项 */
export interface EncryptOptions {
  /** 最高权限密码 */
  global?: string | string[];
  /** 是否全局加密 */
  globalEncrypt?: boolean;
  /** 加密配置 */
  config?: Record<string, string | string[]>;
}

/** 合法的媒体 */
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

/** 项目配置 */
export interface ProjectOptions {
  /** 项目类型 */
  type: "article" | "book" | "link" | "project";
  /** 项目名称 */
  name: string;
  /** 项目描述 */
  desc?: string;
  /** 项目封面 */
  cover?: string;
  /** 项目链接 */
  link: string;
}

/** 博客选项 */
export type BlogOptions = {
  /** 博主名称 */
  name?: string;
  /** 博主头像 */
  avatar?: string;
  /** 是否在侧边栏展示博主信息 */
  sidebarDisplay?: "mobile" | "none" | "always";
  /** 博主的个人介绍地址 */
  intro?: string;
  /** 自定义链接 */
  links?: Partial<Record<BlogMedia, string>>;
  /** 时间轴自定义文字 */
  timeline?: string;
  /** 项目配置 */
  project?: ProjectOptions[];
  /** 每页的项目数量 */
  perPage?: number;
};

/** vuepress-theme-hope 主题配置 */
export interface HopeThemeConfig extends DefaultThemeConfig {
  lastUpdated?: never;
  editLinkText?: never;
  /** 暗黑模式下 logo */
  darkLogo?: string;
  /** 多语言配置 */
  locales?: Record<string, HopeLangLocalesConfig>;
  /** 根目录对应的语言 */
  baseLang?: string;
  /** 默认作者 */
  author?: string;
  /** 导航栏链接 */
  nav?: HopeNavBarConfig;
  /** 侧边栏配置 */
  sidebar?: HopeSideBarConfig;
  /** 页脚配置 */
  footer?: HopeFooterConfig;

  /** 是否允许开启深色模式 */
  darkmode?: "auto-switch" | "auto" | "switch" | "disable";
  /** 主题色配置 */
  themeColor?: Record<string, string> | false;
  /** Markdown 增强设置 */
  markdown?: MarkdownEnhanceOption | false;
  /** 评论设置 */
  comment?: CommentOptions | false;
  /** PWA 设置 */
  pwa?: PWAOptions | false;
  /** 加密设置 */
  encrypt?: EncryptOptions;
  /** 博客设置 */
  blog?: BlogOptions | false;
  /** 页面信息 */
  pageInfo?: PageInfotype[] | false;
  /** 站点地址 */
  hostname?: string;
  /** 最后更新时间转换 */
  lastUpdatedTransformer?: (timestamp: number, lang: string) => string;
  /** SEO */
  seo?: SeoOptions | false;
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
