import { resolve, usePageFrontmatter, useRouteLocale } from "@vuepress/client";
import type { ComputedRef } from "vue";
import { computed, ref } from "vue";

import { store } from "@temp/blog/store";
import { typeMap } from "@temp/blog/type";

import type {
  BlogTypeFrontmatterOptions,
  TypeMap,
} from "../../shared/index.js";
import type { BlogTypeData } from "../typings.js";

declare const __VUE_HMR_RUNTIME__: Record<string, unknown>;
declare const __VUEPRESS_DEV__: boolean;
declare const BLOG_META_SCOPE: string;

export const blogTypeMap = ref(typeMap);

export const useBlogType = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  key = "",
): ComputedRef<BlogTypeData<T>> => {
  const routeLocale = useRouteLocale();

  return computed(() => {
    const mapKey =
      key ||
      usePageFrontmatter<{ blog?: BlogTypeFrontmatterOptions }>().value.blog
        ?.key ||
      "";

    if (!mapKey) {
      console.warn(`useBlogType: key not found`);

      // fallback data
      return { path: "/", items: [] };
    }

    if (!blogTypeMap.value[mapKey])
      throw new Error(`useBlogType: key ${key} is invalid`);

    const configMap = blogTypeMap.value[mapKey][routeLocale.value];
    const result: BlogTypeData<T> = {
      path: configMap.path,
      items: [],
    };

    for (const index of configMap.items) {
      const { path, meta } = resolve(store[index]);

      result.items.push({
        path,
        info: BLOG_META_SCOPE === "" ? <T>meta : <T>meta[BLOG_META_SCOPE],
      });
    }

    return result;
  });
};

// @ts-ignore
if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot))
  __VUE_HMR_RUNTIME__["updateBlogType"] = (
    map: Record<string, TypeMap>,
  ): void => {
    blogTypeMap.value = map;
  };
