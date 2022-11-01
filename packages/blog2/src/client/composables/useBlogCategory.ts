import { categoryMap } from "@temp/blog/category";
import { usePageFrontmatter, useRouteLocale } from "@vuepress/client";
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { resolveRouteWithRedirect } from "vuepress-shared/client";

import type { ComputedRef } from "vue";
import type {
  BlogCategoryData,
  BlogCategoryFrontmatterOptions,
  CategoryMap,
} from "../../shared/index.js";

// eslint-disable-next-line
declare const __VUE_HMR_RUNTIME__: Record<string, any>;
declare const __VUEPRESS_DEV__: boolean;
declare const BLOG_META_SCOPE: string;

export const blogCategoryMap = ref(categoryMap);

export const useBlogCategory = <
  T extends Record<string, unknown> = Record<string, unknown>
>(
  key = ""
): ComputedRef<BlogCategoryData<T>> => {
  const router = useRouter();
  const route = useRoute();
  const routeLocale = useRouteLocale();

  return computed(() => {
    const mapKey =
      key ||
      usePageFrontmatter<{ blog?: BlogCategoryFrontmatterOptions }>().value.blog
        ?.key ||
      "";

    const routes = router.getRoutes();

    if (!blogCategoryMap.value[mapKey])
      throw new Error(
        `useBlogCategory: ${
          key
            ? `key ${key} is invalid`
            : "can not bind to an existing key on non blog pages"
        }`
      );

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

      if (route.path === categoryMap.path)
        result.currentItems = result.map[category].items;
    }

    return result;
  });
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
  __VUE_HMR_RUNTIME__["updateBlogCategory"] = (
    map: Record<string, CategoryMap>
  ): void => {
    blogCategoryMap.value = map;
  };
}
