import type { AutoLink, TextItem } from "./utils.js";

export type HopeThemeSidebarPageItem = AutoLink;

export interface HopeThemeSidebarGroupItem extends TextItem {
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
   * Whether current group is collapsible
   *
   * 当前分组的链接是否可折叠
   *
   * @default false
   */
  collapsible?: boolean;

  /**
   * Children of current group
   *
   * 当前分组的子项
   */
  children: (
    | HopeThemeSidebarPageItem
    | HopeThemeSidebarGroupItem
    | HopeThemeSidebarStructureItem
    | string
  )[];
}

export interface HopeThemeSidebarStructureItem extends TextItem {
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
   * Whether current group is collapsible
   *
   * 当前分组的链接是否可折叠
   *
   * @default false
   */
  collapsible?: boolean;

  children: "structure";
}

export type HopeThemeSidebarItem =
  | HopeThemeSidebarPageItem
  | HopeThemeSidebarGroupItem
  | HopeThemeSidebarStructureItem
  | string;

export type HopeThemeSidebarArrayConfig = HopeThemeSidebarItem[];

export type HopeThemeSidebarObjectConfig = Record<
  string,
  HopeThemeSidebarArrayConfig | "structure" | false
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
  prefix: string;
  children: ResolvedSidebarItem[];
}

export type ResolvedSidebarItem =
  | ResolvedHopeThemeSidebarHeaderItem
  | ResolvedHopeThemeSidebarPageItem
  | ResolvedHopeThemeSidebarGroupItem;
