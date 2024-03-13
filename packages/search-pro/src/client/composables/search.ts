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

export const useSearchResult = (queries: Ref<string[]>): SearchRef => {
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

    const performSearch = useDebounceFn((queries: string[]): void => {
      const query = queries.join(" ");
      const {
        searchFilter = (results): SearchResult[] => results,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        splitWord,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        suggestionsFilter,
        ...options
      } = searchOptions.value;

      searching.value = true;

      if (query)
        search(queries.join(" "), routeLocale.value, options)
          .then((results) =>
            searchFilter(results, query, routeLocale.value, pageData.value),
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
    }, searchProOptions.searchDelay - searchProOptions.suggestDelay);

    watch([queries, routeLocale], ([queries]) => performSearch(queries), {
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
