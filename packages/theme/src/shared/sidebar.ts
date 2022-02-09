import { HopeThemeNavGroup, AutoLink } from "./navbar";

/**
 * Sidebar types
 */
// user config
export type HopeThemeSidebarPageItem = AutoLink;

export interface HopeThemeSidebarGroupItem
  extends HopeThemeNavGroup<
    HopeThemeSidebarPageItem | HopeThemeSidebarGroupItem | string
  > {
  collapsable?: boolean;
}

export type HopeThemeSidebarItem =
  | HopeThemeSidebarPageItem
  | HopeThemeSidebarGroupItem
  | string;

export type HopeThemeSidebarArrayConfig = HopeThemeSidebarItem[];

export type HopeThemeSidebarObjectConfig = Record<
  string,
  HopeThemeSidebarArrayConfig
>;

export type HopeThemeSidebarConfig =
  | HopeThemeSidebarArrayConfig
  | HopeThemeSidebarObjectConfig;

// resolved
export interface ResolvedHopeThemeSidebarHeaderItem
  extends HopeThemeSidebarPageItem {
  type: "heading";
  children: ResolvedHopeThemeSidebarHeaderItem[];
}

export interface ResolvedHopeThemeSidebarPageItem
  extends HopeThemeSidebarPageItem {
  type: "page";
  children: ResolvedHopeThemeSidebarHeaderItem[];
}

export interface ResolvedHopeThemeSidebarGroupItem
  extends HopeThemeSidebarGroupItem {
  type: "group";
  children: ResolvedSidebarItem[];
}

export type ResolvedSidebarItem =
  | ResolvedHopeThemeSidebarHeaderItem
  | ResolvedHopeThemeSidebarPageItem
  | ResolvedHopeThemeSidebarGroupItem;
