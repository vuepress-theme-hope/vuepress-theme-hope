import type { I18nConfig, ThemeConfig } from "./config";
import type { SiteData } from "./context";
import type { Page, PageComputed, PageFrontmatter } from "./page";
import type VueRouter, { Route } from "vue-router";

declare module "vue/types/vue" {
  export interface Vue {
    $description: string;
    $frontmatter: PageFrontmatter;
    $lang: string;
    $localeConfig: {
      lang: string;
      path: string;
    };
    $localePath: string;
    $page: PageComputed;

    // context.getSiteData()
    $site: SiteData;
    $siteTitle: string;
    $themeConfig: ThemeConfig;
    $themeLocaleConfig: I18nConfig;
    $title: string;

    // injected in client/app.js
    $withBase: (path: string) => string;

    // vue-router
    $router: VueRouter;
    $route: Route;
  }
}

export interface ClientComputedMixin {
  readonly $site: SiteData;
  readonly $themeConfig: ThemeConfig;
  readonly $frontmatter: PageFrontmatter;
  readonly $localeConfig: I18nConfig;
  readonly $siteTitle: string;
  readonly $title: string;
  readonly $description: string;
  readonly $lang: string;
  readonly $localePath: string;
  readonly $themeLocaleConfig: string;
  readonly $page: Page;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  __page: Page;

  setPage: (page: Page) => void;
}
