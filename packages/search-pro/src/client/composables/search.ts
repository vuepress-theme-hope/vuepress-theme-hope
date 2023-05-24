import { useRouteLocale } from "@vuepress/client";
import { useDebounceFn } from "@vueuse/core";
import { type Ref, ref, shallowRef, watch } from "vue";

import { searchProOptions } from "../define.js";
import { useSearchOptions } from "../helpers/index.js";
import { type SearchResult } from "../typings/index.js";

declare const __VUEPRESS_BASE__: string;
declare const __VUEPRESS_DEV__: boolean;

export interface SearchRef {
  searching: Ref<boolean>;
  results: Ref<SearchResult[]>;
}

export const useWorkerSearch = (query: Ref<string>): SearchRef => {
  const searchOptions = useSearchOptions();
  const routeLocale = useRouteLocale();

  const searching = ref(false);
  const results = shallowRef<SearchResult[]>([]);

  let worker: Worker | null;

  const search = useDebounceFn((queryString: string): void => {
    searching.value = true;
    worker?.terminate();
    if (queryString) {
      // service worker with module only works on webkit browsers now, so we only used it in dev
      worker = new Worker(
        __VUEPRESS_DEV__
          ? new URL("../worker/index.js", import.meta.url)
          : `${__VUEPRESS_BASE__}${searchProOptions.worker}`,
        __VUEPRESS_DEV__ ? { type: "module" } : {}
      );

      worker.addEventListener(
        "message",
        ({ data }: MessageEvent<SearchResult[]>) => {
          results.value = data;
          searching.value = false;
        }
      );

      worker.postMessage({
        query: queryString,
        routeLocale: routeLocale.value,
        options: searchOptions,
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
