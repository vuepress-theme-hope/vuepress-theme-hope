import type { NavbarConfig } from "../../navbar";

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
   * Set to `false` to disable navbar in current locale
   */
  config?: false | NavbarConfig;

  /**
   * Navbar logo
   *
   * should be absolute path relative to `.vuepress/public` folder
   *
   * 导航栏图标
   *
   * 应为基于 `.vuepress/public` 文件夹的绝对路径
   */
  logo?: null | string;
  /**
   * Navbar logo under darkmode
   *
   * should be absolute path relative to `.vuepress/public` folder
   *
   * 夜间模式下导航栏图标
   *
   * 应为基于 `.vuepress/public` 文件夹的绝对路径
   */
  darkLogo?: null | string;

  /**
   * Navbar repository config
   *
   * Used for the repository link of navbar
   */
  repo?: null | string;

  /**
   * Whether display repo link in navbar
   *
   * 是否在导航栏显示仓库链接
   *
   * @default true
   */
  repoDisplay?: boolean;

  /**
   * Navbar repository config
   *
   * Used for the repository text of navbar
   */
  repoLabel?: null | string;

  /**
   * Whether to hide navbar when scrolling down
   *
   * 是否在向下滚动时自动隐藏导航栏
   *
   * @default 'mobile'
   */
  autoHide?: "always" | "mobile" | "none";

  /**
   * Whether hide site title on mobile
   *
   * 是否在移动视图下隐藏站点名称
   *
   * @default true
   */
  hideSiteNameonMobile?: boolean;
}
