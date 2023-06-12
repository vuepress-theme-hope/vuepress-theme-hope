import type { BackToTopOptions } from "vuepress-plugin-components";

import type { FooterLocaleOptions } from "./footer.js";
import type { DocsRepoLocaleOptions } from "./info.js";
import type { MetaLocaleOptions, MetaLocateData } from "./meta.js";
import type { NavbarLocaleData, NavbarLocaleOptions } from "./navbar.js";
import type { RouteLocaleData } from "./route.js";
import type { SidebarLocaleOptions, SidebarSorter } from "./sidebar.js";
import type { PageInfo } from "../../info.js";

export interface LayoutLocaleData {
  /**
   * Navbar related i18n config
   */
  navbarLocales: NavbarLocaleData;

  /**
   * Meta related i18n config
   */

  metaLocales: MetaLocateData;

  /**
   * Router related i18n config
   */
  routeLocales: RouteLocaleData;
}

export interface LayoutLocaleOptions
  extends NavbarLocaleOptions,
    SidebarLocaleOptions,
    DocsRepoLocaleOptions,
    MetaLocaleOptions,
    FooterLocaleOptions {
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
   * @see https://theme-hope.vuejs.press/guide/feature/page-info.html
   *
   * 文章信息配置
   *
   * @see https://theme-hope.vuejs.press/zh/guide/feature/page-info.html
   *
   * @default ["Author", "Original", "Date", "PageView", "ReadingTime", "Category", "Tag"]
   */
  pageInfo?: PageInfo[] | false;

  /**
   * Whether show toc list in desktop mode
   *
   * 是否在桌面模式下展示标题列表
   */
  toc?: boolean;

  /**
   * Whether rtl layout should be used
   *
   * 是否使用 rtl 布局
   */
  rtl?: boolean;

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

export type LayoutLocaleConfig = LayoutLocaleOptions;

/**
 * @kind root
 */
export interface LayoutOptions {
  /**
   * Wether display back to top button
   *
   * 是否显示返回顶部按钮
   *
   * @default true
   */
  backToTop?: BackToTopOptions | boolean;

  /**
   * Sorter of structure sidebar
   *
   * 结构化侧边栏排序器
   *
   * @default ["readme", "index", "title", "filename"]
   */
  sidebarSorter?: SidebarSorter;
}
