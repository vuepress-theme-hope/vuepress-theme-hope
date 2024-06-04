import type { AutoLinkOptions, NavItemOptions } from "./nav.js";

export type SidebarLinkOptions = AutoLinkOptions;

export interface SidebarGroupOptions extends NavItemOptions {
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
   * Whether current group is expanded by default
   *
   * 当前分组的链接是否默认展开
   *
   * @default false
   */
  expanded?: boolean;

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
  children: SidebarItemOptions[];
}

export interface SidebarStructureOptions extends NavItemOptions {
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
   * Whether current group is expanded by default
   *
   * 当前分组的链接是否默认展开
   *
   * @default false
   */
  expanded?: boolean;

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

export type SidebarItemOptions =
  | SidebarLinkOptions
  | SidebarGroupOptions
  | SidebarStructureOptions
  | string;

export type SidebarArrayOptions = SidebarItemOptions[];

export type SidebarObjectOptions = Record<
  string,
  SidebarArrayOptions | "structure" | false
>;

export type SidebarOptions =
  | SidebarArrayOptions
  | SidebarObjectOptions
  | "structure"
  | false;
