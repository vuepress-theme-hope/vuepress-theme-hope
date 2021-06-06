import { useRouteLocale, useSiteLocaleData } from "@vuepress/client";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useThemeLocaleData } from "../themeData";

import type { ComputedRef } from "vue";
import type { ResolvedNavbarItem } from "../../../shared";

/**
 * Get navbar config of select language dropdown
 */
export const useNavbarLanguageDropdown = (): ComputedRef<
  ResolvedNavbarItem[]
> => {
  const router = useRouter();
  const routeLocale = useRouteLocale();
  const siteLocale = useSiteLocaleData();
  const themeLocale = useThemeLocaleData();

  return computed<ResolvedNavbarItem[]>(() => {
    const localePaths = Object.keys(siteLocale.value.locales);
    // do not display language selection dropdown if there is only one language
    if (localePaths.length < 2) {
      return [];
    }
    const currentPath = router.currentRoute.value.path;
    const currentFullPath = router.currentRoute.value.fullPath;

    const languageDropdown: ResolvedNavbarItem = {
      text: themeLocale.value.selectLanguageText ?? "unkown language",
      ariaLabel: themeLocale.value.selectLanguageAriaLabel ?? "unkown language",
      children: localePaths.map((targetLocalePath) => {
        // target locale config of this langauge link
        const targetSiteLocale =
          siteLocale.value.locales?.[targetLocalePath] ?? {};
        const targetThemeLocale =
          themeLocale.value.locales?.[targetLocalePath] ?? {};
        const targetLang = targetSiteLocale.lang || "";

        const text = targetThemeLocale.selectLanguageName ?? targetLang;
        let link;

        if (targetLang === siteLocale.value.lang) {
          // if the target language is current language
          // stay at current link
          link = currentFullPath;
        } else {
          // if the target language is not current language
          // try to link to the corresponding page of current page
          // or fallback to homepage
          const targetLocalePage = currentPath.replace(
            routeLocale.value,
            targetLocalePath
          );
          if (
            router.getRoutes().some((item) => item.path === targetLocalePage)
          ) {
            link = targetLocalePage;
          } else {
            link = targetThemeLocale.home ?? targetLocalePath;
          }
        }

        return {
          text,
          link,
        };
      }),
    };

    return [languageDropdown];
  });
};
