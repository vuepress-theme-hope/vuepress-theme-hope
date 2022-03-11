import type { AutoLink, TextItem } from "./utils";

/**
 * Base nav group, has nav items children
 */
export interface HopeThemeNavGroup<T> extends TextItem {
  prefix?: string;
  link?: string;
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
