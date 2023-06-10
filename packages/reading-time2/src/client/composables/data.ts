import { usePageData } from "@vuepress/client";
import type { ComputedRef } from "vue";
import { computed } from "vue";

import type {
  ReadingTime,
  ReadingTimePluginPageData,
} from "../../shared/index.js";

export const useReadingTimeData = (): ComputedRef<ReadingTime | null> => {
  const page = usePageData<Partial<ReadingTimePluginPageData>>();

  return computed(() => page.value.readingTime ?? null);
};
