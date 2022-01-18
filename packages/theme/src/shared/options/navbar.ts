/**
 * Base nav item, displayed as text
 */
export interface LinkItem {
  text: string;
  icon?: string;
  ariaLabel?: string;
}

/**
 * Base nav group, has nav items children
 */
export interface NavGroup<T> extends LinkItem {
  prefix?: string;
  link?: string;
  children: T[];
}

/**
 * Props for `<AutoLink>`
 */
export interface AutoLink extends LinkItem {
  link: string;
  rel?: string;
  target?: string;
  activeMatch?: string;
}

/**
 * Navbar types
 */
// user config
export type NavbarItem = AutoLink;
export type NavbarGroup = NavGroup<NavbarGroup | NavbarItem | string>;
export type NavbarConfig = (NavbarItem | NavbarGroup | string)[];
// resolved
export type ResolvedNavbarItem = NavbarItem | NavGroup<ResolvedNavbarItem>;

export interface HopeThemeNavbarConfig {
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
   * Navbar repository config
   *
   * Used for the repository text of navbar
   */
  repoLabel?: null | string;

  /**
   * Navbar language selection config
   *
   * Text of the language selection dropdown
   */
  selectLanguageText?: string;

  /**
   * Navbar language selection config
   *
   * Aria label of of the language selection dropdown
   */
  selectLanguageAriaLabel?: string;

  /**
   * Navbar language selection config
   *
   * Language name of current locale
   *
   * Displayed inside the language selection dropdown
   */
  selectLanguageName?: string;

  /**
   * Whether to hide navbar when scrolling down
   *
   * 是否在向下滚动时自动隐藏导航栏
   *
   * @default 'mobile'
   */
  autoHide?: "always" | "mobile" | "none";
}
