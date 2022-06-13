import type { HopeThemeFooterLocaleOptions } from "./footer";
import type { HopeThemeDocsLocaleOptions } from "./info";
import type {
  HopeThemeMetaLocateData,
  HopeThemeMetaLocaleOptions,
} from "./meta";
import type {
  HopeThemeNavbarLocaleData,
  HopeThemeNavbarLocaleOptions,
} from "./navbar";
import type { HopeThemeSidebarLocaleOptions } from "./sidebar";
import type { HopeThemeRouteLocaleData } from "./route";
import type { PageInfo } from "../../info";

export interface HopeThemeLayoutLocaleData {
  navbarLocales: HopeThemeNavbarLocaleData;

  metaLocales: HopeThemeMetaLocateData;

  routeLocales: HopeThemeRouteLocaleData;
}

export interface HopeThemeLayoutLocaleOptions
  extends HopeThemeNavbarLocaleOptions,
    HopeThemeSidebarLocaleOptions,
    HopeThemeDocsLocaleOptions,
    HopeThemeMetaLocaleOptions,
    HopeThemeFooterLocaleOptions {
  /**
   * Home path of current locale
   *
   * @description Used as the link of back-to-home and navbar logo
   *
   * 当前语言的主页路径
   *
   * @description 用于导航栏图标和返回主页按钮的链接
   */
  home?: string;

  /**
   * Whether enable breadcrumb globally
   *
   * 是否全局启用路径导航
   *
   * @default true
   */
  breadcrumb?: boolean;

  /**
   * Whether display icon in breadcrumb
   *
   * 是否在路径导航显示图标
   *
   * @default true
   */
  breadcrumbIcon?: boolean;

  /**
   * Whether display icon besides page title
   *
   * 是否在页面标题旁显示图标
   *
   * @default true
   */
  titleIcon?: boolean;

  /**
   * Article Info display configuration
   *
   * @see https://vuepress-theme-hope.github.io/v2/components/guide/article-info.html
   *
   * 文章信息配置
   *
   * @see https://vuepress-theme-hope.gitee.io/v2/components/zh/guide/article-info.html
   *
   * @default ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"]
   */
  pageInfo?: PageInfo[] | false;

  /**
   * Whether show toc list in desktop mode
   *
   * 是否在桌面模式下展示标题列表
   */
  toc?: boolean;

  /**
   * Whether display nextLink
   *
   * 是否显示 下一篇 链接
   *
   * @default true
   */
  nextLink?: boolean;

  /**
   * Whether display prevLink
   *
   * 是否显示 上一篇 链接
   *
   * @default true
   */
  prevLink?: boolean;
}

export type HopeThemeLayoutLocaleConfig = HopeThemeLayoutLocaleOptions;

export interface HopeThemeLayoutRootOptions {
  /**
   * Wether display back to top button
   *
   * If it’s set with a number, then it will be the threshold
   *
   * 是否显示返回顶部按钮
   *
   * 如果设置为数字，则该数字为触发临界值 (默认临界值为 300px)
   *
   * @default true
   */
  backToTop?: boolean | number;

  /**
   * Window width switching mobile view and desktop view in pixels.
   *
   * 切换桌面布局和移动布局的窗口宽度，单位像素。
   *
   * @default 719
   */
  mobileBreakPoint?: number;
}
