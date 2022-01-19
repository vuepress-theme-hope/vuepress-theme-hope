import type { HopeThemeFooterLocaleOptions } from "./footer";
import type {
  HopeThemeMetaLocaleOptions,
  HopeThemeMetaLocateData,
} from "./meta";
import type {
  HopeThemeNavbarLocaleData,
  HopeThemeNavbarLocaleOptions,
} from "./navbar";
import type { HopeThemeSidebarLocaleOptions } from "./sidebar";
import type { HopeThemeRouteLocaleData } from "./route";

export interface HopeThemeLayoutLocaleData {
  navbarLocales: HopeThemeNavbarLocaleData;
  /**
   * Page locate config
   */
  metaLocales: HopeThemeMetaLocateData;

  routeLocales: HopeThemeRouteLocaleData;
}

export interface HopeThemeLayoutLocaleOptions {
  /**
   * Home path of current locale
   *
   * Used as the link of back-to-home and navbar logo
   */
  home?: string;
  /**
   * Navbar
   */
  navbar?: HopeThemeNavbarLocaleOptions;

  /**
   * Sidebar
   */
  sidebar?: HopeThemeSidebarLocaleOptions;

  /**
   * Page footer
   */
  footer?: HopeThemeFooterLocaleOptions;

  /**
   * Page meta
   */
  meta?: HopeThemeMetaLocaleOptions;
}
