import { startsWith } from "@vuepress/helper/client";
import type { Ref } from "vue";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { usePageData, useRouteLocale } from "vuepress/client";

import { enableAutoSuggestions } from "../define.js";
import { useSearchOptions } from "../helpers/index.js";
import { createSearchWorker } from "../utils/index.js";

export interface SuggestionsRef {
  suggestions: Ref<string[]>;
}

export const useSearchSuggestions = (
  queries: Ref<string[]>,
): SuggestionsRef => {
  const suggestions = ref<string[]>([]);

  if (enableAutoSuggestions) {
    const searchOptions = useSearchOptions();
    const pageData = usePageData();
    const routeLocale = useRouteLocale();

    onMounted(() => {
      const { suggest, terminate } = createSearchWorker();

      watch(
        [queries, routeLocale],
        ([queries]) => {
          const query = queries.join(" ");
          const {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            searchFilter,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            splitWord,
            suggestionsFilter = (suggestions): string[] => suggestions,
            ...options
          } = searchOptions.value;

          if (query)
            suggest(query, routeLocale.value, options)
              .then((suggestions) =>
                suggestionsFilter(
                  suggestions,
                  query,
                  routeLocale.value,
                  pageData.value,
                ),
              )
              .then((_suggestions) => {
                suggestions.value = _suggestions.length
                  ? startsWith(_suggestions[0], query) &&
                    !_suggestions[0].slice(query.length).includes(" ")
                    ? _suggestions
                    : [query, ..._suggestions]
                  : [];
              })
              .catch((err) => {
                console.error(err);
              });
          else suggestions.value = [];
        },
        {
          immediate: true,
        },
      );

      onUnmounted(() => {
        terminate();
      });
    });
  }

  return {
    suggestions,
  };
};
