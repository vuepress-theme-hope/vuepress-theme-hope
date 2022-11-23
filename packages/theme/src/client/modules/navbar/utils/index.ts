import type {
  AutoLink,
  NavGroup,
  NavbarItem,
} from "../../../../shared/index.js";

// resolved
export type ResolvedThemeNavbarItem =
  | NavbarItem
  | NavGroup<AutoLink | NavGroup<AutoLink>>;
