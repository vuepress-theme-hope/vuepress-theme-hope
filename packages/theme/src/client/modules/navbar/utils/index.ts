import type {
  AutoLinkOptions,
  NavGroup,
  NavbarLinkOptions,
} from "../../../../shared/index.js";

export type NavbarItem =
  | NavbarLinkOptions
  | NavGroup<AutoLinkOptions | NavGroup<AutoLinkOptions>>;
