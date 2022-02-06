/**
 * Base nav item, displayed as text
 */
export interface HopeThemeNavLinkItem {
  text: string;
  icon?: string;
  ariaLabel?: string;
}

/**
 * Base nav group, has nav items children
 */
export interface HopeThemeNavGroup<T> extends HopeThemeNavLinkItem {
  prefix?: string;
  link?: string;
  children: T[];
}

/**
 * Props for `<AutoLink>`
 */
export interface AutoLink extends HopeThemeNavLinkItem {
  link: string;
  rel?: string;
  target?: string;
  activeMatch?: string;
}

/**
 * Navbar types
 */
// user config
export type HopeThemeNavbarItem = AutoLink;
export type HopeThemeNavbarGroup = HopeThemeNavGroup<
  HopeThemeNavbarGroup | HopeThemeNavbarItem | string
>;
export type HopeThemeNavbarConfig = (
  | HopeThemeNavbarItem
  | HopeThemeNavbarGroup
  | string
)[];

// resolved
export type ResolvedHopeThemeNavbarItem =
  | HopeThemeNavbarItem
  | HopeThemeNavGroup<AutoLink | HopeThemeNavGroup<AutoLink>>;
