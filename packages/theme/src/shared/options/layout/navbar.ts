import type { HopeThemeNavbarConfig } from "../../navbar";

export type HopeThemeNavbarComponent =
  | "Brand"
  | "Links"
  | "Language"
  | "Search"
  | "Outlook"
  | "Repo";

export interface HopeNavbarLayoutOptions {
  left: HopeThemeNavbarComponent[];
  center: HopeThemeNavbarComponent[];
  right: HopeThemeNavbarComponent[];
}

export interface HopeThemeNavbarLocaleData {
  /**
   * Navbar language selection config
   *
   * Text of the language selection dropdown
   */
  selectLangText: string;

  /**
   * Navbar language selection config
   *
   * Aria label of of the language selection dropdown
   */
  selectLangAriaLabel: string;

  /**
   * Navbar language selection config
   *
   * Language name of current locale
   *
   * Displayed inside the language selection dropdown
   */
  langName: string;
}

export interface HopeThemeNavbarLocaleOptions {
  /**
   * Navbar config
   *
   * @description Set to `false` to disable navbar in current locale
   * @see https://vuepress-theme-hope.github.io/v2/guide/layout/navbar.html
   *
   * 导航栏配置
   *
   * @description 设置 `false` 以在当前语言中禁用导航栏
   * @see https://vuepress-theme-hope.gitee.io/v2/zh/guide/layout/navbar.html
   */
  navbar?: HopeThemeNavbarConfig | false;

  /**
   * Navbar logo
   *
   * should be absolute path relative to `.vuepress/public` folder
   *
   * 导航栏图标
   *
   * 应为基于 `.vuepress/public` 文件夹的绝对路径
   */
  logo?: string;

  /**
   * Navbar logo under darkmode
   *
   * should be absolute path relative to `.vuepress/public` folder
   *
   * 夜间模式下导航栏图标
   *
   * 应为基于 `.vuepress/public` 文件夹的绝对路径
   */
  logoDark?: string;

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
   * @default 'mobile'
   */
  navbarAutoHide?: "always" | "mobile" | "none";

  /**
   * Navbar layout config
   *
   * 导航栏布局设置
   *
   * @default { left: ["Brand"], center: ["Links"], right: ["Language", "Repo", "Outlook", "Search"] }
   */
  navbarLayout?: HopeNavbarLayoutOptions;

  /**
   * Whether hide site title on mobile
   *
   * 是否在移动视图下隐藏站点名称
   *
   * @default true
   */
  hideSiteNameonMobile?: boolean;
}
