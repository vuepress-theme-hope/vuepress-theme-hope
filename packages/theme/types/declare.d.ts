/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  I18nConfig,
  ThemeConfig,
  PageComputed,
  PageFrontmatter,
  SiteData,
} from "@mr-hope/vuepress-types";
import { HopeThemeConfig } from "./hopeConfig";

declare module "@mr-hope/vuepress-types" {
  interface ThemeConfig extends HopeThemeConfig {
    // FIXME:
    _?: undefined;
  }
}

declare module "vue/types/vue" {
  export interface Vue {
    $category: any;
    $tag: any;
    $currentTag: any;
    $currentCategory: any;
    $pagination: any;

    $description: string;
    $frontmatter: PageFrontmatter;
    $lang: string;
    $localeConfig: { lang: string; path: string };
    $localePath: string;
    $page: PageComputed;
    $site: SiteData;
    $siteTitle: string;
    $themeConfig: ThemeConfig;
    $themeLocaleConfig: I18nConfig;
    $title: string;
  }
}
