import type { AutoLink, TextItem } from "./utils.js";

/**
 * Base nav group, has nav items children
 */
export interface HopeThemeNavGroup<T> extends TextItem {
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

/**
 * Navbar types
 */
// user config
export type HopeThemeNavbarItem = AutoLink;
export type HopeThemeNavbarGroup = HopeThemeNavGroup<
  HopeThemeNavbarGroup | HopeThemeNavbarItem | string
>;
export type HopeThemeNavbarConfig = (
  | HopeThemeNavbarItem
  | HopeThemeNavbarGroup
  | string
)[];

// resolved
export type ResolvedHopeThemeNavbarItem =
  | HopeThemeNavbarItem
  | HopeThemeNavGroup<AutoLink | HopeThemeNavGroup<AutoLink>>;
