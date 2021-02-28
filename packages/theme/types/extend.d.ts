/* eslint-disable @typescript-eslint/no-explicit-any */
import { HopeThemeLocaleConfigItem } from "@mr-hope/vuepress-shared";
import {
  BlogMedia,
  HopeThemeConfig,
  HopeNavBarConfig,
  HopeSideBarConfig,
} from "./theme";
import { PageInfotype } from "@mr-hope/vuepress-plugin-comment";
import { FeedFrontmatterOption } from "@mr-hope/vuepress-plugin-feed";
import { AlgoliaOption } from "@mr-hope/vuepress-types";

declare module "vue/types/vue" {
  export interface Vue {
    $category: any;
    $tag: any;
    $currentTag: any;
    $currentCategory: any;
    $pagination: any;
  }
}

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
    star?: boolean | number;
    article?: boolean;
    timeline?: boolean;
    password?: string | number;
    image?: string;
    copyright?: {
      minLength?: number;
      noCopy?: boolean;
      noSelect?: boolean;
    };
    feed?: FeedFrontmatterOption;
    pageInfo?: PageInfotype[] | false;
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

  interface I18nConfig extends Partial<HopeThemeLocaleConfigItem> {
    /** 导航栏链接 */
    nav?: HopeNavBarConfig;
    /** 侧边栏配置 */
    sidebar?: HopeSideBarConfig;
    /** 当前语言的 algolia 设置 */
    algolia?: AlgoliaOption;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ThemeConfig extends HopeThemeConfig {}
}
