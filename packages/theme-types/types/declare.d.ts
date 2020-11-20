import {
  HopeNavBarConfig,
  HopeSideBarConfig,
  HopeLangI18nConfig,
} from "@mr-hope/vuepress-shared-utils";
import { BlogMedia, HopeThemeConfig } from "vuepress-theme-hope";
import { PageInfotype } from "@mr-hope/vuepress-plugin-comment";
import { AlgoliaOption } from "@mr-hope/vuepress-types";
declare module "@mr-hope/vuepress-types" {
  interface PageFrontmatter {
    icon?: string;
    author?: string | false;
    original?: boolean;
    /**
     * @deprecated
     */
    date?: Date | string;
    time?: Date | string;
    category?: string;
    tag?: string[];
    /**
     * @deprecated
     */
    tags?: string[];
    sticky?: boolean | number;
    article?: boolean;
    timeline?: boolean;
    password?: string | number;
    image?: string;
    copyright?: {
      minLength?: number;
      noCopy?: boolean;
      noSelect?: boolean;
    };
    pageInfo?: PageInfotype[];
    visitor?: boolean;
    breadcrumb?: boolean;
    breadcrumbIcon?: boolean;
    navbar?: boolean;
    sidebar?: "auto" | boolean;
    sidebarDepth?: number;
    comment?: boolean;
    editLink?: boolean;
    prev?: string | false;
    next?: string | false;
    footer?: string | boolean;
    copyrightText?: string | false;
    mediaLink?: BlogMedia;
    search?: boolean;
    backToTop?: boolean;
  }

  interface ThemeConfig extends HopeThemeConfig {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: unknown;
  }

  interface I18nConfig extends HopeLangI18nConfig {
    /** 导航栏链接 */
    nav?: HopeNavBarConfig;
    /** 侧边栏配置 */
    sidebar?: HopeSideBarConfig;
    /** 当前语言的 algolia 设置 */
    algolia?: AlgoliaOption;
  }
}
