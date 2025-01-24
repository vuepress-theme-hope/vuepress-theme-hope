import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables/index";

import type { BlogLocaleData } from "../../../../shared/index.js";

export const useBlogLocaleData = (): ComputedRef<BlogLocaleData> => {
  const themeLocale = useThemeLocaleData();

  return computed(() => themeLocale.value.blogLocales);
};
