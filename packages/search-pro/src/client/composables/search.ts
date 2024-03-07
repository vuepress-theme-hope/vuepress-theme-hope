import { useDebounceFn } from "@vueuse/core";
import type { Ref } from "vue";
import { onMounted, onUnmounted, ref, shallowRef, watch } from "vue";
import { usePageData, useRouteLocale } from "vuepress/client";

import { searchProOptions } from "../define.js";
import { useSearchOptions } from "../helpers/index.js";
import type { SearchResult } from "../typings/index.js";
import { createSearchWorker } from "../utils/index.js";

export interface SearchRef {
  searching: Ref<boolean>;
  results: Ref<SearchResult[]>;
}

export const useSearchResult = (query: Ref<string>): SearchRef => {
  const searchOptions = useSearchOptions();
  const routeLocale = useRouteLocale();
  const pageData = usePageData();

  const searching = ref(false);
  const results = shallowRef<SearchResult[]>([]);

  onMounted(() => {
    const { search, terminate } = createSearchWorker();

    const endSearch = (): void => {
      results.value = [];
      searching.value = false;
    };

    const performSearch = useDebounceFn((queryString: string): void => {
      searching.value = true;

      if (queryString)
        void search(queryString, routeLocale.value, searchOptions.value)
          .then(
            (results) =>
              searchOptions.value.searchFilter?.(
                results,
                queryString,
                routeLocale.value,
                pageData.value,
              ) ?? results,
          )
          .then((_results) => {
            results.value = _results;
            searching.value = false;
          })
          .catch((err) => {
            console.error(err);
            endSearch();
          });
      else endSearch();
    }, searchProOptions.searchDelay);

    watch([query, routeLocale], () => performSearch(query.value), {
      immediate: true,
    });

    onUnmounted(() => {
      terminate();
    });
  });

  return {
    searching,
    results,
  };
};
