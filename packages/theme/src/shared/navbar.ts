/**
 * Base nav item, displayed as text
 */
export interface LinkItem {
  text: string;
  icon?: string;
  ariaLabel?: string;
}

/**
 * Base nav group, has nav items children
 */
export interface NavGroup<T> extends LinkItem {
  prefix?: string;
  link?: string;
  children: T[];
}

/**
 * Props for `<AutoLink>`
 */
export interface AutoLink extends LinkItem {
  link: string;
  rel?: string;
  target?: string;
  activeMatch?: string;
}

/**
 * Navbar types
 */
// user config
export type NavbarItem = AutoLink;
export type NavbarGroup = NavGroup<NavbarGroup | NavbarItem | string>;
export type NavbarConfig = (NavbarItem | NavbarGroup | string)[];
// resolved
export type ResolvedNavbarItem =
  | NavbarItem
  | NavGroup<AutoLink | NavGroup<AutoLink>>;
