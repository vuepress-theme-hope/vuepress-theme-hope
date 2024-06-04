import type {
  AutoLinkOptions,
  NavbarLinkOptions,
  NavGroup,
} from "../../../../shared/index.js";

export type NavbarItem =
  | NavbarLinkOptions
  | NavGroup<AutoLinkOptions | NavGroup<AutoLinkOptions>>;
