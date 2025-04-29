import type { GetHeadersOptions } from "@vuepress/helper/shared";

import type { FooterLocaleOptions } from "./footer.js";
import type { DocsRepoLocaleOptions } from "./info.js";
import type { MetaLocaleOptions, MetaLocateData } from "./meta.js";
import type { NavbarLocaleData, NavbarLocaleOptions } from "./navbar.js";
import type { RouteLocaleData } from "./route.js";
import type { SidebarLocaleOptions, SidebarSorter } from "./sidebar.js";
import type { PageInfoType } from "../../info.js";

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

export interface DeprecatedLayoutOptions {
  /**
   * @deprecated Use `toc.levels` instead
   */
  headerDepth?: number;
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
  pageInfo?: PageInfoType[] | false;

  /**
   * Whether show toc list in desktop mode
   *
   * An object with the following properties can be set:
   *
   * - `selector`: The selector of the headers.
   * - `ignore`: Ignore specific elements within the header.
   * - `levels`: The levels of the headers.
   *
   * 是否在桌面模式下展示标题列表
   *
   * 可以设置一个对象，包含以下属性：
   *
   * - `selector`: 选择器
   * - `ignore`: 忽略特定元素
   * - `levels`: 标题的级别
   *
   * @default true
   */
  toc?: GetHeadersOptions | boolean;

  /**
   * Whether rtl layout should be used
   *
   * 是否使用 rtl 布局
   *
   * @default false
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
   * Sorter of structure sidebar
   *
   * 结构化侧边栏排序器
   *
   * @default ["readme", "order", "title", "filename"]
   */
  sidebarSorter?: SidebarSorter;
}
