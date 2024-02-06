import type { AutoLinkOptions, TextItemOptions } from "./utils.js";

export type SidebarPageItem = AutoLinkOptions;

export interface SidebarStructureItem extends TextItemOptions {
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

export interface SidebarGroupItem extends TextItemOptions {
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
    | SidebarPageItem
    | SidebarGroupItem
    | SidebarStructureItem
    | string
  )[];
}

export type SidebarItem =
  | SidebarPageItem
  | SidebarGroupItem
  | SidebarStructureItem
  | string;

export type SidebarArrayOptions = SidebarItem[];

export type SidebarObjectOptions = Record<
  string,
  SidebarArrayOptions | "structure" | "heading" | false
>;

export type SidebarOptions =
  | SidebarArrayOptions
  | SidebarObjectOptions
  | "structure"
  | "heading"
  | false;
