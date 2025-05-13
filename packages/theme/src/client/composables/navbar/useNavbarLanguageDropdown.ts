import { entries, keys, useRoutePaths } from "@vuepress/helper/client";
import type { ComputedRef } from "vue";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vuepress/client";

import { useData } from "@theme-hope/composables/useData";

import type { AutoLinkOptions, NavGroup } from "../../../shared/index.js";

/**
 * Get navbar config of select language dropdown
 */
export const useNavbarLanguageDropdown =
  (): ComputedRef<NavGroup<AutoLinkOptions> | null> => {
    const { routeLocale, site, siteLocale, theme, themeLocale } = useData();
    const routePaths = useRoutePaths();
    const route = useRoute();
    const isMounted = ref(false);

    onMounted(() => {
      isMounted.value = true;
    });

    return computed(() => {
      const localePaths = keys(site.value.locales);
      const extraLocales = entries(theme.value.extraLocales ?? {});

      // Do not display language selection dropdown if there is only one language
      if (localePaths.length < 2 && !extraLocales.length) return null;

      const { path, fullPath } = route;
      const { navbarLocales } = themeLocale.value;

      const languageDropdown: NavGroup<AutoLinkOptions> = {
        text: "",
        ariaLabel: navbarLocales.selectLangAriaLabel,
        children: [
          ...localePaths.map((targetLocalePath) => {
            // Target locale config of this language link
            const targetSiteLocale = site.value.locales[targetLocalePath] ?? {};
            const targetThemeLocale =
              theme.value.locales[targetLocalePath] ?? {};
            const targetLang = targetSiteLocale.lang;

            const text = targetThemeLocale.navbarLocales.langName;
            let link;

            // If the target language is current language
            if (targetLang === siteLocale.value.lang) {
              // Stay at current link
              link = fullPath;
            }
            // If the target language is not current language
            else {
              const targetLocalePage = path.replace(
                routeLocale.value,
                targetLocalePath,
              );

              // try to link to the corresponding page of current page
              link = routePaths.value.some((item) => item === targetLocalePage)
                ? isMounted.value
                  ? // try to keep current hash and query across languages
                    fullPath.replace(path, targetLocalePage)
                  : // avoid ssr mismatch
                    targetLocalePage
                : // Or fallback to homepage
                  (targetThemeLocale.home ?? targetLocalePath);
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
              (isMounted.value ? fullPath : path).replace(
                routeLocale.value,
                "",
              ),
            ),
          })),
        ],
      };

      return languageDropdown;
    });
  };
