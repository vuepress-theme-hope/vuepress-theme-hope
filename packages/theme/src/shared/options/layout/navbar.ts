import { type NavbarOptions } from "../../navbar.js";

export interface NavbarLocaleData {
  /**
   * Aria label of of the language selection dropdown
   *
   * 语言下拉列表的无障碍标签
   */
  selectLangAriaLabel: string;

  /**
   * Language name of current locale
   *
   * 当前语言的名称
   */
  langName: string;
}

/**
 * Navbar component
 *
 * 导航栏组件
 */
export type NavbarComponent =
  | "Brand"
  | "Links"
  | "Language"
  | "Search"
  | "Outlook"
  | "Repo";

/**
 * Navbar layout options
 *
 * 导航栏布局选项
 */
export interface NavbarLayoutOptions {
  start?: (NavbarComponent | string)[];
  center?: (NavbarComponent | string)[];
  end?: (NavbarComponent | string)[];
}

export interface NavbarLocaleOptions {
  /**
   * Navbar config
   *
   * @description Set to `false` to disable navbar in current locale
   *
   * @see https://theme-hope.vuejs.press/guide/layout/navbar.html
   *
   * 导航栏配置
   *
   * @description 设置 `false` 以在当前语言中禁用导航栏
   *
   * @see https://theme-hope.vuejs.press/v2/zh/guide/layout/navbar.html
   */
  navbar?: NavbarOptions | false;

  /**
   * Navbar logo
   *
   * @description should be absolute path relative to `.vuepress/public` folder
   *
   * 导航栏图标
   *
   * @description 应为基于 `.vuepress/public` 文件夹的绝对路径
   */
  logo?: string;

  /**
   * Navbar logo under darkmode
   *
   * @description should be absolute path relative to `.vuepress/public` folder
   *
   * 夜间模式下导航栏图标
   *
   * @description 应为基于 `.vuepress/public` 文件夹的绝对路径
   */
  logoDark?: string;

  /**
   * Navbar title
   *
   * 导航栏标题
   *
   * @default $siteLocale.title
   */
  navTitle?: string | false;

  /**
   * Repository link
   *
   * 仓库链接
   */
  repo?: string;

  /**
   * Whether display repo link in navbar.
   *
   * 是否在导航栏显示仓库链接。
   *
   * @default true
   */
  repoDisplay?: boolean;

  /**
   * Repository aria label of navbar
   *
   * 导航栏仓库按钮的无障碍标签
   */
  repoLabel?: string;

  /**
   * Whether show icon in navbar
   *
   * 是否在导航栏中显示图标
   *
   * @default true
   */
  navbarIcon?: boolean;

  /**
   * Whether to hide navbar when scrolling down
   *
   * 是否在向下滚动时自动隐藏导航栏
   *
   * @default "mobile"
   */
  navbarAutoHide?: "always" | "mobile" | "none";

  /**
   * Navbar layout config
   *
   * 导航栏布局设置
   *
   * @default { start: ["Brand"], center: ["Links"], end: ["Language", "Repo", "Outlook", "Search"] }
   */
  navbarLayout?: NavbarLayoutOptions;

  /**
   * Whether hide site title on mobile
   *
   * 是否在移动视图下隐藏站点名称
   *
   * @default true
   */
  hideSiteNameOnMobile?: boolean;
}
