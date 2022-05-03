import type {
  HopeThemeNavbarConfig,
  HopeThemeSidebarArrayConfig,
  HopeThemeSidebarConfig,
  HopeThemeSidebarObjectConfig,
} from "../shared";

export const navbar = (
  navbarConfig: HopeThemeNavbarConfig
): HopeThemeNavbarConfig => navbarConfig;

export const sidebar = (
  sidebarConfig: HopeThemeSidebarConfig
): HopeThemeSidebarConfig => sidebarConfig;

export const arraySidebar = (
  sidebarConfig: HopeThemeSidebarArrayConfig
): HopeThemeSidebarArrayConfig => sidebarConfig;

export const objectSidebar = (
  sidebarConfig: HopeThemeSidebarObjectConfig
): HopeThemeSidebarObjectConfig => sidebarConfig;
