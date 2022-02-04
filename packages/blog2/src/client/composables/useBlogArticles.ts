import { articleMap } from "@temp/blog/article";
import { useRouteLocale } from "@vuepress/client";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import type { ComputedRef } from "vue";
import type { Articles } from "./types";
import type { ArticleMap } from "../../shared";

// eslint-disable-next-line
declare const __VUE_HMR_RUNTIME__: Record<string, any>;

export const blogArticlesMap = ref(articleMap);

export const useBlogArticles = <
  T extends Record<string, unknown> = Record<string, unknown>
>(): ComputedRef<Articles<T>> => {
  const router = useRouter();
  const routeLocale = useRouteLocale();

  return computed(() => {
    const routes = router.getRoutes();
    const result: Articles<T> = [];

    for (const key of blogArticlesMap.value[routeLocale.value]) {
      const route = routes.find(({ name }) => name === key);

      if (route) result.push({ path: route.path, meta: route.meta as T });
    }

    return result;
  });
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (import.meta.webpackHot || import.meta.hot) {
  __VUE_HMR_RUNTIME__.updateBlogArticles = (map: ArticleMap): void => {
    blogArticlesMap.value = map;
  };
}
