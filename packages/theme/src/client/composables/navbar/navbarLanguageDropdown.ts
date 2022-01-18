import { useRouteLocale, useSiteLocaleData } from "@vuepress/client";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useNavbarLocaleData } from "./navbarConfig";
import { useThemeLocaleData } from "../themeData";

import type { ComputedRef } from "vue";
import type { ResolvedNavbarItem } from "../../../shared";

/**
 * Get navbar config of select language dropdown
 */
export const useNavbarLanguageDropdown =
  (): ComputedRef<ResolvedNavbarItem | null> => {
    const router = useRouter();
    const routeLocale = useRouteLocale();
    const siteLocale = useSiteLocaleData();
    const navbarLocale = useNavbarLocaleData();
    const themeLocale = useThemeLocaleData();

    return computed<ResolvedNavbarItem | null>(() => {
      const localePaths = Object.keys(siteLocale.value.locales);
      // do not display language selection dropdown if there is only one language
      if (localePaths.length < 2) return null;

      const currentPath = router.currentRoute.value.path;
      const currentFullPath = router.currentRoute.value.fullPath;

      const languageDropdown: ResolvedNavbarItem = {
        text: navbarLocale.value.selectLanguageText ?? "language",
        ariaLabel:
          navbarLocale.value.selectLanguageAriaLabel ?? "Select language",
        children: localePaths.map((targetLocalePath) => {
          // target locale config of this langauge link
          const targetSiteLocale =
            siteLocale.value.locales?.[targetLocalePath] ?? {};
          const targetThemeLocale =
            themeLocale.value.locales?.[targetLocalePath] ?? {};
          const targetLang = targetSiteLocale.lang || "";

          const text =
            targetThemeLocale.navbar?.selectLanguageName ?? targetLang;
          let link;

          // if the target language is current language
          if (targetLang === siteLocale.value.lang) {
            // stay at current link
            link = currentFullPath;
          }
          // if the target language is not current language
          else {
            const targetLocalePage = currentPath.replace(
              routeLocale.value,
              targetLocalePath
            );

            link =
              // try to link to the corresponding page of current page
              router.getRoutes().some((item) => item.path === targetLocalePage)
                ? targetLocalePage
                : // or fallback to homepage
                  targetThemeLocale.home ?? targetLocalePath;
          }

          return {
            text,
            link,
          };
        }),
      };

      return languageDropdown;
    });
  };
