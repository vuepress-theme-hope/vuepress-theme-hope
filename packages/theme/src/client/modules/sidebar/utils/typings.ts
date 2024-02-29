import type {
  SidebarGroupItem,
  SidebarPageItem,
} from "../../../../shared/index.js";

export interface ResolvedSidebarPageItem extends SidebarPageItem {
  type: "page";
}

export interface ResolvedSidebarGroupItem extends SidebarGroupItem {
  type: "group";
  prefix: string;
  children: ResolvedSidebarItem[];
}

export type ResolvedSidebarItem =
  | ResolvedSidebarPageItem
  | ResolvedSidebarGroupItem;
