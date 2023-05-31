import { useRouteLocale, useSiteLocaleData } from "@vuepress/client";
import { type ComputedRef, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { entries, keys } from "vuepress-shared/client";

import {
  useThemeData,
  useThemeLocaleData,
} from "@theme-hope/composables/index";

import {
  type AutoLinkOptions,
  type NavGroup,
} from "../../../../shared/index.js";

/**
 * Get navbar config of select language dropdown
 */
export const useNavbarLanguageDropdown =
  (): ComputedRef<NavGroup<AutoLinkOptions> | null> => {
    const router = useRouter();
    const route = useRoute();
    const routeLocale = useRouteLocale();
    const siteLocale = useSiteLocaleData();
    const themeData = useThemeData();
    const themeLocale = useThemeLocaleData();

    return computed(() => {
      const localePaths = keys(siteLocale.value.locales);
      const extraLocales = entries(themeData.value.extraLocales ?? {});

      // do not display language selection dropdown if there is only one language
      if (localePaths.length < 2 && !extraLocales.length) return null;

      const { path, fullPath } = router.currentRoute.value;
      const { navbarLocales } = themeLocale.value;

      const languageDropdown: NavGroup<AutoLinkOptions> = {
        text: "",
        ariaLabel: navbarLocales?.selectLangAriaLabel,
        children: [
          ...localePaths.map((targetLocalePath) => {
            // target locale config of this language link
            const targetSiteLocale =
              siteLocale.value.locales?.[targetLocalePath] ?? {};
            const targetThemeLocale =
              themeData.value.locales?.[targetLocalePath] ?? {};
            const targetLang = targetSiteLocale.lang || "";

            const text =
              targetThemeLocale.navbarLocales?.langName ?? targetLang;
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
                router
                  .getRoutes()
                  .some((item) => item.path === targetLocalePage)
                  ? // try to keep current hash across languages
                    fullPath.replace(path, targetLocalePage)
                  : // or fallback to homepage
                    targetThemeLocale.home ?? targetLocalePath;
            }

            return {
              text,
              link,
            };
          }),
          ...extraLocales.map(([text, path]) => ({
            text,
            link: path.replace(
              ":route",
              route.path.replace(routeLocale.value, "")
            ),
          })),
        ],
      };

      return languageDropdown;
    });
  };
