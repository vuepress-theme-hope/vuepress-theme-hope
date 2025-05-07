import type {
  SidebarGroupOptions,
  SidebarLinkOptions,
} from "../../shared/index.js";

export type SidebarLinkItem = SidebarLinkOptions;

export interface SidebarGroupItem extends SidebarGroupOptions {
  prefix: string;
  children: SidebarItem[];
}

export type SidebarItem = SidebarLinkItem | SidebarGroupItem;
