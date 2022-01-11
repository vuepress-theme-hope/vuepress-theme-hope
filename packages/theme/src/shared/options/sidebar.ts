import { NavGroup, AutoLink } from "./navbar";

/**
 * Sidebar types
 */
// user config
export type SidebarPageItem = AutoLink;

export interface SidebarGroupItem
  extends NavGroup<SidebarPageItem | SidebarGroupItem | string> {
  prefix?: string;
  collapsable?: boolean;
}

export type SidebarItem = SidebarPageItem | SidebarGroupItem | string;

export type SidebarConfigArray = SidebarItem[];

export type SidebarConfigObject = Record<string, SidebarConfigArray>;

export type SidebarConfig = SidebarConfigArray | SidebarConfigObject;

// resolved
export interface ResolvedSidebarHeaderItem extends SidebarPageItem {
  type: "heading";
  children: ResolvedSidebarHeaderItem[];
}

export interface ResolvedSidebarPageItem extends SidebarPageItem {
  type: "page";
  children: ResolvedSidebarHeaderItem[];
}

export interface ResolvedSidebarGroupItem extends SidebarGroupItem {
  type: "group";
  children: ResolvedSidebarItem[];
}

export type ResolvedSidebarItem =
  | ResolvedSidebarHeaderItem
  | ResolvedSidebarPageItem
  | ResolvedSidebarGroupItem;
