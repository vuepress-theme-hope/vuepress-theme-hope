import { categoryMap } from "@temp/blog/category";
import { useRouteLocale } from "@vuepress/client";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { resolveRouteWithRedirect } from "../utils";

import type { ComputedRef } from "vue";
import type { Articles } from "./types";
import type { CategoryMap } from "../../shared";

// eslint-disable-next-line
declare const __VUE_HMR_RUNTIME__: Record<string, any>;
declare const BLOG_META_SCOPE: string;

export const blogCategoryMap = ref(categoryMap);

export interface BlogCategoryData<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  path: string;
  map: Record<string, { path: string; items: Articles<T> }>;
}

export const useBlogCategory = <
  T extends Record<string, unknown> = Record<string, unknown>
>(
  key: string
): ComputedRef<BlogCategoryData<T>> => {
  const router = useRouter();
  const routeLocale = useRouteLocale();

  return computed(() => {
    const routes = router.getRoutes();
    const currentMap = blogCategoryMap.value[key][routeLocale.value];
    const result: BlogCategoryData<T> = {
      path: currentMap.path,
      map: {},
    };

    for (const category in currentMap.map) {
      const categoryMap = currentMap.map[category];

      result.map[category] = { path: categoryMap.path, items: [] };

      for (const pageKey of categoryMap.keys) {
        const route = routes.find(({ name }) => name === pageKey);

        if (route) {
          const finalRoute = resolveRouteWithRedirect(route.path);

          result.map[category].items.push({
            path: finalRoute.path,
            meta:
              BLOG_META_SCOPE === ""
                ? (finalRoute.meta as T)
                : (finalRoute.meta[BLOG_META_SCOPE] as T),
          });
        }
      }
    }

    return result;
  });
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (import.meta.webpackHot || import.meta.hot) {
  __VUE_HMR_RUNTIME__.updateBlogCategory = (
    map: Record<string, CategoryMap>
  ): void => {
    blogCategoryMap.value = map;
  };
}
