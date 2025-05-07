import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useData } from "@theme-hope/composables/useData";

import type { BlogLocaleConfig } from "../../../shared/index.js";

export const useBlogOptions = (): ComputedRef<BlogLocaleConfig> => {
  const { theme, themeLocale } = useData();

  return computed(() => ({
    ...theme.value.blog,
    ...themeLocale.value.blog,
  }));
};
