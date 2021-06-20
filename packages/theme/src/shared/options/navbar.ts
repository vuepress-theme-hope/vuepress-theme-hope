/**
 * Base nav item, displayed as text
 */
export interface NavItem {
  text: string;
  icon?: string;
  ariaLabel?: string;
}

/**
 * Base nav group, has nav items children
 */
export interface NavGroup<T> extends NavItem {
  prefix?: string;
  link?: string;
  children: T[];
}

/**
 * Props for `<NavLink>`
 */
export interface NavLink extends NavItem {
  link: string;
  rel?: string;
  target?: string;
  activeMatch?: string;
}

/**
 * Navbar types
 */
// user config
export type NavbarItem = NavLink;
export type NavbarGroup = NavGroup<NavbarGroup | NavbarItem | string>;
export type NavbarConfig = (NavbarItem | NavbarGroup | string)[];
// resolved
export type ResolvedNavbarItem = NavbarItem | NavGroup<ResolvedNavbarItem>;
