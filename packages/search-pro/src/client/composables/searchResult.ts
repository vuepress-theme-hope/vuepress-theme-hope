import { useDebounceFn } from "@vueuse/core";
import { useRouteLocale } from "@vuepress/client";
import { computed, ref, watch } from "vue";

import { searchIndex } from "./searchIndex.js";
import { searchProDelay } from "../define.js";
import { getResults } from "../utils/index.js";

import type { Ref } from "vue";
import type { Result } from "../utils/index.js";

export const useSearchResults = (query: Ref<string>): Ref<Result[]> => {
  const routeLocale = useRouteLocale();
  const results = ref<Result[]>([]);

  const localeIndex = computed(() => searchIndex.value[routeLocale.value]);
  const updateResults = useDebounceFn((queryString: string): void => {
    results.value = queryString
      ? getResults(queryString, localeIndex.value)
      : [];
  }, searchProDelay);

  watch([query, routeLocale], () => {
    void updateResults(query.value);
  });

  return results;
};
