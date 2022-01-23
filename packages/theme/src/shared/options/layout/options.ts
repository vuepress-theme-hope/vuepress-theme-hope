import type { PageInfo } from "@mr-hope/vuepress-plugin-components";
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

export interface HopeThemeLayoutOptions {
  /**
   * Page Info display configuration
   *
   * @see https://vuepress-theme-hope.github.io/components/guide/pageinfo/
   *
   * 文章信息配置
   *
   * @see https://vuepress-theme-hope.github.io/components/zh/guide/pageinfo/
   *
   * @default ['author', 'visitor', 'time', 'category', 'tag', 'reading-time']
   */
  pageInfo?: PageInfo[];
}
