import { pagesRoutes } from "@internal/pagesRoutes";
import { useSiteData } from "@vuepress/client";
import { resolveLocalePath } from "@vuepress/shared";
import { inject, provide, reactive, watch } from "vue";
import { resolveRouteWithRedirect } from "../../utils";

import type { InjectionKey } from "vue";
import type { ArticleDetail } from "../../../shared";

export type Articles = Record<string, ArticleDetail[]>;

export const articlesSymbol: InjectionKey<Articles> = Symbol.for("articles");

/**
 * Inject articles
 */
export const useArticles = (): Articles => {
  const articles = inject(articlesSymbol);

  if (!articles) {
    throw new Error("useArticles() is called without provider.");
  }

  return articles;
};

export const setupArticles = (): void => {
  const siteData = useSiteData();

  const articles = reactive<Articles>({});

  provide(articlesSymbol, articles);

  watch(
    () => siteData.value.locales,
    (locales) => {
      for (const key in locales) {
        const routeSet = new Set();

        articles[key] = pagesRoutes
          // extract routeMeta and path
          .map((record) => {
            const finalRoute = resolveRouteWithRedirect(record.path);

            if (
              // route are not in current locale
              resolveLocalePath(locales, finalRoute.path) !== key ||
              // route already exists
              routeSet.has(finalRoute.path)
            )
              return null;

            routeSet.add(finalRoute.path);

            return {
              path: finalRoute.path,
              ...resolveRouteWithRedirect(finalRoute.path).meta,
            };
          })
          .filter(
            (record): record is ArticleDetail =>
              record !== null && record.type !== "page"
          );
      }
    },
    { immediate: true }
  );
};
