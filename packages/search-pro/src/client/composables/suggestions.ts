import { useRouteLocale } from "@vuepress/client";
import { useDebounceFn } from "@vueuse/core";
import { type Ref, onMounted, onUnmounted, ref, watch } from "vue";

import { enableAutoSuggestions, searchProOptions } from "../define.js";
import { useSearchOptions } from "../helpers/index.js";
import { createSearchWorker } from "../utils/index.js";

export interface SuggestionsRef {
  suggestions: Ref<string[]>;
}

export const useSearchSuggestions = (query: Ref<string>): SuggestionsRef => {
  const suggestions = ref<string[]>([]);

  if (enableAutoSuggestions) {
    const searchOptions = useSearchOptions();
    const routeLocale = useRouteLocale();

    onMounted(() => {
      const performAutoSuggest = useDebounceFn((queryString: string): void => {
        if (queryString)
          void search({
            type: "suggest",
            query: queryString,
            locale: routeLocale.value,
            options: searchOptions,
          })
            .then((_suggestions) => {
              suggestions.value = _suggestions;
            })
            .catch((err) => {
              console.error(err);
            });
        else suggestions.value = [];
      }, searchProOptions.suggestDelay);

      const { search, terminate } = createSearchWorker();

      watch([query, routeLocale], () => performAutoSuggest(query.value), {
        immediate: true,
      });

      onUnmounted(() => {
        terminate();
      });
    });
  }

  return {
    suggestions,
  };
};
