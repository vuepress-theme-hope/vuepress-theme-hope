import type { FooterLocaleOptions } from "./footer.js";
import type { DocsRepoLocaleOptions } from "./info.js";
import type { MetaLocateData, MetaLocaleOptions } from "./meta.js";
import type { NavbarLocaleData, NavbarLocaleOptions } from "./navbar.js";
import type { SidebarLocaleOptions, SidebarSorter } from "./sidebar.js";
import type { RouteLocaleData } from "./route.js";

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

export type LayoutLocaleConfig = LayoutLocaleOptions;

/**
 * @kind root
 */
export interface LayoutOptions {
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
   * @description This should be the same value with `$tablet` value in `config.scss`.
   *
   * 切换桌面布局和移动布局的窗口宽度，单位像素。
   *
   * @description 该值应与 `config.scss` 中的 `$tablet` 值相同。
   *
   * @default 719
   */
  mobileBreakPoint?: number;

  /**
   * Sorter of structure sidebar
   *
   * 结构化侧边栏排序器
   *
   * @default 'order'
   */
  sidebarSorter?: SidebarSorter;
}

export type LayoutConfig = Pick<LayoutOptions, "mobileBreakPoint">;
