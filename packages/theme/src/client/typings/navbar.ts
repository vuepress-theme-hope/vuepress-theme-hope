import type { AutoLinkOptions, NavGroup } from "../../shared/index.js";

export type NavbarLinkItem = AutoLinkOptions;

export type NavbarItem =
  | NavbarLinkItem
  | NavGroup<AutoLinkOptions | NavGroup<NavbarLinkItem>>;
