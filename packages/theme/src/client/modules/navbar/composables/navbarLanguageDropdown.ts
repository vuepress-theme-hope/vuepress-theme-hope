import { useRouteLocale, useSiteLocaleData } from "@vuepress/client";
import { computed } from "vue";
import { useRouter } from "vue-router";

import {
  useThemeData,
  useThemeLocaleData,
} from "@theme-hope/composables/index.js";

import type { ComputedRef } from "vue";
import type { AutoLink, HopeThemeNavGroup } from "../../../../shared/index.js";

/**
 * Get navbar config of select language dropdown
 */
export const useNavbarLanguageDropdown =
  (): ComputedRef<HopeThemeNavGroup<AutoLink> | null> => {
    const router = useRouter();
    const routeLocale = useRouteLocale();
    const siteLocale = useSiteLocaleData();
    const themeData = useThemeData();
    const themeLocale = useThemeLocaleData();

    return computed<HopeThemeNavGroup<AutoLink> | null>(() => {
      const localePaths = Object.keys(siteLocale.value.locales);

      // do not display language selection dropdown if there is only one language
      if (localePaths.length < 2) return null;

      const { path, hash } = router.currentRoute.value;
      const { navbarLocales } = themeLocale.value;

      const languageDropdown: HopeThemeNavGroup<AutoLink> = {
        text: "",
        ariaLabel: navbarLocales?.selectLangAriaLabel,
        children: localePaths.map((targetLocalePath) => {
          // target locale config of this language link
          const targetSiteLocale =
            siteLocale.value.locales?.[targetLocalePath] ?? {};
          const targetThemeLocale =
            themeData.value.locales?.[targetLocalePath] ?? {};
          const targetLang = targetSiteLocale.lang || "";

          const text = targetThemeLocale.navbarLocales?.langName ?? targetLang;
          let link;

          // if the target language is current language
          if (targetLang === siteLocale.value.lang) {
            // stay at current link
            link = path;
          }
          // if the target language is not current language
          else {
            const targetLocalePage = path.replace(
              routeLocale.value,
              targetLocalePath
            );

            link =
              // try to link to the corresponding page of current page
              router.getRoutes().some((item) => item.path === targetLocalePage)
                ? // try to keep current hash across languages
                  `${targetLocalePage}${hash}`
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
