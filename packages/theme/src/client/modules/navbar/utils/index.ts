import {
  type AutoLinkOptions,
  type NavGroup,
  type NavbarItem,
} from "../../../../shared/index.js";

// resolved
export type ResolvedThemeNavbarItem =
  | NavbarItem
  | NavGroup<AutoLinkOptions | NavGroup<AutoLinkOptions>>;
