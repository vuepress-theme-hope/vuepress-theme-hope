import type {
  AutoLinkConfig,
  NavGroup,
  NavbarItem,
} from "../../../../shared/index.js";

// Resolved
export type ResolvedThemeNavbarItem =
  | NavbarItem
  | NavGroup<AutoLinkConfig | NavGroup<AutoLinkConfig>>;
