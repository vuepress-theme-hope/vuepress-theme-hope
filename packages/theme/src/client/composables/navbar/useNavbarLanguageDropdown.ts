import { entries, keys, useRoutePaths } from "@vuepress/helper/client";
import type { ComputedRef } from "vue";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vuepress/client";

import { useData } from "@theme-hope/composables/useData";

import type { AutoLinkOptions, NavGroup } from "../../../shared/index.js";

/**
 * Get navbar config of select language dropdown
 *
 * @returns Navbar config of select language dropdown
 */
export const useNavbarLanguageDropdown = (): ComputedRef<NavGroup<AutoLinkOptions> | null> => {
  const { routeLocale, site, siteLocale, theme, themeLocale } = useData();
  const routePaths = useRoutePaths();
  const route = useRoute();
  const isMounted = ref(false);

  const isRootLocaleClean = computed(() => {
    const subLocales = Object.keys(site.value.locales).filter((localePath) => localePath !== "/");

    if (subLocales.length === 0) return false;

    const isAllowedRootPath = (path: string) => path === "/" || /^\/?404(?:\.html)?$/.test(path);

    const localeRegExp = new RegExp(
      `^(?:${subLocales.map((locale) => locale.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    );

    // only / and /404.html for root locale
    return routePaths.value.filter((path) => !localeRegExp.test(path)).every(isAllowedRootPath);
  });

  onMounted(() => {
    isMounted.value = true;
  });

  return computed(() => {
    let localePaths = keys(site.value.locales);
    const extraLocales = entries(theme.value.extraLocales ?? {});

    // remove / locale
    if (isRootLocaleClean.value)
      localePaths = localePaths.filter((localePath) => localePath !== "/");

    // Do not display language selection dropdown if there is only one language
    if (localePaths.length < 2 && extraLocales.length === 0) return null;

    const { path, fullPath } = route;
    const { navbarLocales } = themeLocale.value;

    const languageDropdown: NavGroup<AutoLinkOptions> = {
      text: "",
      ariaLabel: navbarLocales.selectLangAriaLabel,
      children: [
        ...localePaths.map((targetLocalePath) => {
          // Target locale config of this language link
          const targetSiteLocale = site.value.locales[targetLocalePath] ?? {};
          const targetThemeLocale = theme.value.locales[targetLocalePath] ?? {};
          const targetLang = targetSiteLocale.lang;

          const text = targetThemeLocale.navbarLocales.langName;
          let link: string;

          // If the target language is current language
          if (targetLang === siteLocale.value.lang) {
            // Stay at current link
            link = fullPath;
          }
          // If the target language is not current language
          else {
            const targetLocalePage = path.replace(routeLocale.value, targetLocalePath);

            // try to link to the corresponding page of current page
            link = routePaths.value.some((item) => item === targetLocalePage)
              ? isMounted.value
                ? // try to keep current hash and query across languages
                  fullPath.replace(path, targetLocalePage)
                : // avoid SSR mismatch
                  targetLocalePage
              : // Or fallback to homepage
                (targetThemeLocale.home ?? targetLocalePath);
          }

          return {
            text,
            link,
          };
        }),
        ...extraLocales.map(([text, localPath]) => ({
          text,
          link: localPath.replace(
            ":route",
            (isMounted.value ? fullPath : localPath).replace(routeLocale.value, ""),
          ),
        })),
      ],
    };

    return languageDropdown;
  });
};
