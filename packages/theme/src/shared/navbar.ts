import type { AutoLinkOptions, NavItemOptions } from "./nav.js";

/**
 * Base nav group, has nav items children
 */
export interface NavGroup<T> extends NavItemOptions {
  /**
   * Link prefix of current group
   *
   * 当前分组的页面前缀
   */
  prefix?: string;

  /**
   * Link of current group
   *
   * 当前分组的链接
   */
  link?: string;

  /**
   * Children of current group
   *
   * 当前分组的子项
   */
  children: T[];
}

// Navbar types

// types for NavbarItem
export type NavbarLinkOptions = AutoLinkOptions;
// types for NavbarDropdown
export type NavbarGroupOptions = NavGroup<
  NavbarLinkOptions | NavGroup<NavbarLinkOptions> | string
>;
// types for navbar options
export type NavbarOptions = (NavbarLinkOptions | NavbarGroupOptions | string)[];
