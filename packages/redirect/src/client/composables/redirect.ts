import { usePreferredLanguages } from "@vueuse/core";
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRoutes, useRouteLocale } from "vuepress/client";
import { entries, isLinkHttp } from "@vuepress/helper/client";

import { redirectConfig } from "@temp/redirect/config.js";

import { redirectLocaleConfig, redirectLocaleEntries } from "../define.js";
import { normalizePath } from "../utils/index.js";

const {
  autoLocale,
  defaultBehavior,
  defaultLocale: defaultLocalePath,
  localeFallback,
} = redirectLocaleConfig;

/**
 * @description devServer only function to handle redirects
 */
export const setupRedirect = (): void => {
  const languages = usePreferredLanguages();
  const route = useRoute();
  const router = useRouter();
  const routeLocale = useRouteLocale();

  const isRootLocale = computed(() => routeLocale.value === "/");

  const handleLocaleRedirect = (): void => {
    const routes = useRoutes();
    const defaultLocale =
      defaultLocalePath &&
      routes.value.some(
        ({ path }) => path === route.path.replace("/", defaultLocalePath),
      )
        ? defaultLocalePath
        : routes.value.find(
            ({ path }) =>
              route.path.split("/").length >= 3 &&
              path === route.path.replace(/^\/[^/]+\//, "/"),
          )?.path;

    let matchedLocalePath: string | null = null;

    // Get matched locale
    findLanguage: for (const lang of languages.value)
      for (const [localePath, langs] of redirectLocaleEntries)
        if (langs.includes(lang)) {
          if (
            localeFallback &&
            routes.value.every(
              ({ path }) => path !== route.path.replace("/", path),
            )
          )
            continue;

          matchedLocalePath = localePath;
          break findLanguage;
        }

    // default link
    const defaultRoute = defaultLocale
      ? route.fullPath.replace("/", defaultLocale)
      : null;

    // Default link
    const defaultRoute = defaultLocale
      ? route.fullPath.replace("/", defaultLocale)
      : null;

    // A locale matches
    if (matchedLocalePath) {
      const hasLocalePage = routes.value.some(
        ({ path }) => route.path.replace("/", matchedLocalePath!) == path,
      );
      const localeRoute = route.fullPath.replace("/", matchedLocalePath);

      const routePath =
        // The locale page exists
        hasLocalePage
          ? localeRoute
          : // The page does not exist
            defaultBehavior === "homepage"
            ? // Locale homepage
              matchedLocalePath
            : defaultBehavior === "defaultLocale" && defaultRoute
              ? // Default locale page
                defaultRoute
              : // As is to get a 404 page of that locale
                localeRoute;

      void router.replace(routePath);
    }
    // We have a default page
    else if (defaultRoute) {
      void router.replace(defaultRoute);
    } else if (route.path !== "/404.html") {
      void router.replace("/404.html");
    }
  };

  watch(
    () => route.path,
    (path) => {
      // Handle redirects
      for (const [from, to] of entries(redirectConfig))
        if (normalizePath(path.toLowerCase()) === from.toLowerCase()) {
          if (isLinkHttp(to)) window.open(to);
          else void router.replace(to);

          return;
        }

      if (autoLocale && isRootLocale.value) handleLocaleRedirect();
    },
    { immediate: true },
  );
};
