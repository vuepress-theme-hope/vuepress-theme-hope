import type { ArticleInfo } from "@mr-hope/vuepress-plugin-components";
import type { HopeThemeFooterLocaleOptions } from "./footer";
import type {
  HopeThemeMetaLocateData,
  HopeThemeMetaLocaleOptions,
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

export interface HopeThemeLayoutLocaleOptions
  extends HopeThemeNavbarLocaleOptions,
    HopeThemeSidebarLocaleOptions,
    HopeThemeMetaLocaleOptions,
    HopeThemeFooterLocaleOptions {
  /**
   * Home path of current locale
   *
   * Used as the link of back-to-home and navbar logo
   */
  home?: string;

  /**
   * Article Info display configuration
   *
   * @see https://vuepress-theme-hope.github.io/components/guide/articleInfo/
   *
   * 文章信息配置
   *
   * @see https://vuepress-theme-hope.github.io/components/zh/guide/articleInfo/
   *
   * @default ['author', 'visitor', 'time', 'category', 'tag', 'reading-time']
   */
  pageInfo?: ArticleInfo[];

  /**
   * Whether display icon besides page title
   *
   * 是否在页面标题旁显示图标
   *
   * @default true
   */
  titleIcon?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HopeThemeLayoutOptions {
  // nothing
}
