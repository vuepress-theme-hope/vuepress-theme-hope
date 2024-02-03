import type {
  AutoLinkOptions,
  NavGroup,
  NavbarItem,
} from "../../../../shared/index.js";

// Resolved
export type ResolvedThemeNavbarItem =
  | NavbarItem
  | NavGroup<AutoLinkOptions | NavGroup<AutoLinkOptions>>;
