import { usePageFrontmatter, useRouteLocale } from "@vuepress/client";
import type { ComputedRef } from "vue";
import { computed, readonly, shallowRef } from "vue";
import { useRouter } from "vue-router";
import { resolveRouteWithRedirect } from "vuepress-shared/client";

import { typeMap } from "@temp/blog/type";

import type {
  BlogTypeFrontmatterOptions,
  TypeMap,
} from "../../shared/index.js";
import type { BlogTypeData } from "../typings.js";

declare const __VUE_HMR_RUNTIME__: Record<string, unknown>;
declare const __VUEPRESS_DEV__: boolean;
declare const BLOG_META_SCOPE: string;

const _blogTypeMap = shallowRef(typeMap);

export const blogTypeMap = readonly(_blogTypeMap);

export const useBlogType = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  key?: string,
): ComputedRef<BlogTypeData<T>> => {
  const frontmatter = usePageFrontmatter<{
    blog?: BlogTypeFrontmatterOptions;
  }>();
  const router = useRouter();
  const routeLocale = useRouteLocale();

  return computed(() => {
    const mapKey = key ?? frontmatter.value.blog?.key ?? "";

    if (!mapKey) {
      console.warn(`useBlogType: key not found`);

      // fallback data
      return { path: "/", items: [] };
    }

    if (!blogTypeMap.value[mapKey])
      throw new Error(`useBlogType: key ${key} is invalid`);

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

// @ts-ignore
if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot))
  __VUE_HMR_RUNTIME__["updateBlogType"] = (
    map: Record<string, TypeMap>,
  ): void => {
    _blogTypeMap.value = map;
  };
