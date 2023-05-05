import { useRouteLocale } from "@vuepress/client";
import { useDebounceFn } from "@vueuse/core";
import { type Ref, ref, shallowRef, watch } from "vue";

import { searchProOptions } from "../define.js";
import { type Result } from "../utils/index.js";

declare const __VUEPRESS_BASE__: string;
declare const __VUEPRESS_DEV__: boolean;

export interface SearchRef {
  searching: Ref<boolean>;
  results: Ref<Result[]>;
}

export const useWorkerSearch = (query: Ref<string>): SearchRef => {
  const routeLocale = useRouteLocale();

  const searching = ref(false);
  const results = shallowRef<Result[]>([]);

  let worker: Worker | null;

  const search = useDebounceFn((queryString: string): void => {
    searching.value = true;
    worker?.terminate();
    if (queryString) {
      worker = new Worker(
        __VUEPRESS_DEV__
          ? // this only works on webkit browsers now, so we only used it in dev
            new URL("../worker/index.js", import.meta.url)
          : `${__VUEPRESS_BASE__}${searchProOptions.worker}`,
        __VUEPRESS_DEV__ ? { type: "module" } : {}
      );

      worker.addEventListener("message", ({ data }: MessageEvent<Result[]>) => {
        results.value = data;
        searching.value = false;
      });

      worker.postMessage({
        query: queryString,
        routeLocale: routeLocale.value,
      });
    } else {
      results.value = [];
      searching.value = false;
    }
  }, searchProOptions.delay);

  watch([query, routeLocale], () => search(query.value), {
    immediate: true,
  });

  return {
    searching,
    results,
  };
};
