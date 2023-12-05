import {
  usePageData,
  usePageFrontmatter,
  useRouteLocale,
} from "@vuepress/client";
import type { ComputedRef } from "vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { resolveRouteWithRedirect } from "vuepress-shared/client";

import { categoryMap } from "@temp/blog/category";

import type {
  BlogCategoryFrontmatterOptions,
  CategoryMap,
} from "../../shared/index.js";
import type { BlogCategoryData } from "../typings.js";

// eslint-disable-next-line
declare const __VUE_HMR_RUNTIME__: Record<string, any>;
declare const __VUEPRESS_DEV__: boolean;
declare const BLOG_META_SCOPE: string;

export const blogCategoryMap = ref(categoryMap);

export const useBlogCategory = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  key = "",
): ComputedRef<BlogCategoryData<T>> => {
  const page = usePageData();
  const router = useRouter();
  const routeLocale = useRouteLocale();

  return computed(() => {
    const mapKey =
      key ||
      usePageFrontmatter<{ blog?: BlogCategoryFrontmatterOptions }>().value.blog
        ?.key ||
      "";

    if (!mapKey) {
      console.warn(`useBlogCategory: key not found`);

      // fallback data
      return { path: "/", map: {} };
    }

    const routes = router.getRoutes();

    if (!blogCategoryMap.value[mapKey])
      throw new Error(`useBlogCategory: key ${mapKey} is invalid`);

    const currentMap = blogCategoryMap.value[mapKey][routeLocale.value];
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
          const finalRoute = resolveRouteWithRedirect(router, route.path);

          result.map[category].items.push({
            path: finalRoute.path,
            info:
              BLOG_META_SCOPE === ""
                ? <T>finalRoute.meta
                : <T>finalRoute.meta[BLOG_META_SCOPE],
          });
        }
      }

      if (page.value.path === categoryMap.path)
        result.currentItems = result.map[category].items;
    }

    return result;
  });
};

// @ts-ignore
if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot))
  __VUE_HMR_RUNTIME__["updateBlogCategory"] = (
    map: Record<string, CategoryMap>,
  ): void => {
    blogCategoryMap.value = map;
  };
