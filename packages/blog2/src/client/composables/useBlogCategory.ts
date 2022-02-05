import { categoryMap } from "@temp/blog/category";
import { useRouteLocale } from "@vuepress/client";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import type { ComputedRef } from "vue";
import type { Articles } from "./types";
import type { CategoryMap } from "../../shared";

// eslint-disable-next-line
declare const __VUE_HMR_RUNTIME__: Record<string, any>;
declare const BLOG_META_SCOPE: string;

export const blogCategoryMap = ref(categoryMap);

export type CategoryData<
  T extends Record<string, unknown> = Record<string, unknown>
> = Record<string, Articles<T>>;

export const useBlogCategory = <
  T extends Record<string, unknown> = Record<string, unknown>
>(
  key: string
): ComputedRef<CategoryData<T>> => {
  const router = useRouter();
  const routeLocale = useRouteLocale();

  return computed(() => {
    const routes = router.getRoutes();
    const result: Record<string, Articles<T>> = {};
    const currentMap = blogCategoryMap.value[key][routeLocale.value];

    for (const category in currentMap) {
      result[category] = [];

      for (const pageKey of currentMap[category]) {
        const route = routes.find(({ name }) => name === pageKey);

        if (route)
          result[category].push({
            path: route.path,
            meta:
              BLOG_META_SCOPE === ""
                ? (route.meta as T)
                : (route.meta[BLOG_META_SCOPE] as T),
          });
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
