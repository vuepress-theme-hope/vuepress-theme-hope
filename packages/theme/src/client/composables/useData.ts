import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from "@vuepress/plugin-theme-data/client";
import type { ClientData } from "vuepress/client";
import { useData as _useData } from "vuepress/client";

import { useTheme, useThemeLocale } from "@theme-hope/composables/useTheme";

import type {
  ThemeData,
  ThemeLocaleConfig,
  ThemeNormalPageFrontmatter,
  ThemePageData,
} from "../../shared/index.js";

export interface Data<
  PageFrontmatter extends Record<string, unknown> = ThemeNormalPageFrontmatter,
  PageData extends Record<string, unknown> = ThemePageData,
> extends Pick<
    ClientData<PageFrontmatter, PageData>,
    | "frontmatter"
    | "head"
    | "headTitle"
    | "lang"
    | "layouts"
    | "page"
    | "pageComponent"
    | "pageLayout"
    | "redirects"
    | "routeLocale"
    | "routePath"
    | "routes"
    | "site"
    | "siteLocale"
  > {
  theme: ThemeDataRef<ThemeData>;
  themeLocale: ThemeLocaleDataRef<ThemeLocaleConfig>;
}

export const useData = <
  PageFrontmatter extends Record<string, unknown> = ThemeNormalPageFrontmatter,
  PageData extends Record<string, unknown> = ThemePageData,
>(): Data<PageFrontmatter, PageData> => ({
  ..._useData<PageFrontmatter, PageData>(),
  theme: useTheme(),
  themeLocale: useThemeLocale(),
});
