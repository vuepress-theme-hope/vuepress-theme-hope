import type {
  AutoLinkOptions,
  NavGroup,
  NavbarItem,
} from "../../../../shared/index.js";

// resolved
export type ResolvedThemeNavbarItem =
  | NavbarItem
  | NavGroup<AutoLinkOptions | NavGroup<AutoLinkOptions>>;
