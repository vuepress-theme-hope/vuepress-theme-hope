import { typeMap } from "@temp/blog/type";
import { usePageFrontmatter, useRouteLocale } from "@vuepress/client";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { resolveRouteWithRedirect } from "vuepress-shared/client";

import type { ComputedRef } from "vue";
import type {
  BlogTypeData,
  BlogTypeFrontmatterOptions,
  TypeMap,
} from "../../shared/index.js";

declare const __VUE_HMR_RUNTIME__: Record<string, unknown>;
declare const __VUEPRESS_DEV__: boolean;
declare const BLOG_META_SCOPE: string;

export const blogTypeMap = ref(typeMap);

export const useBlogType = <
  T extends Record<string, unknown> = Record<string, unknown>
>(
  key = ""
): ComputedRef<BlogTypeData<T>> => {
  const router = useRouter();
  const routeLocale = useRouteLocale();

  return computed(() => {
    const mapKey =
      key ||
      usePageFrontmatter<{ blog?: BlogTypeFrontmatterOptions }>().value.blog
        ?.key ||
      "";

    if (!blogTypeMap.value[mapKey])
      throw new Error(
        `useBlogType: ${
          key
            ? `key ${key} is invalid`
            : "can not bind to an existing key on non blog pages"
        }`
      );

    const routes = router.getRoutes();
    const configMap = blogTypeMap.value[mapKey][routeLocale.value];
    const result: BlogTypeData<T> = {
      path: configMap.path,
      items: [],
    };

    for (const pageKey of configMap.keys) {
      const route = routes.find(({ name }) => name === pageKey);

      if (route) {
        const finalRoute = resolveRouteWithRedirect(router, route.path);

        result.items.push({
          path: finalRoute.path,
          info:
            BLOG_META_SCOPE === ""
              ? <T>finalRoute.meta
              : <T>finalRoute.meta[BLOG_META_SCOPE],
        });
      }
    }

    return result;
  });
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
  __VUE_HMR_RUNTIME__["updateBlogType"] = (
    map: Record<string, TypeMap>
  ): void => {
    blogTypeMap.value = map;
  };
}
