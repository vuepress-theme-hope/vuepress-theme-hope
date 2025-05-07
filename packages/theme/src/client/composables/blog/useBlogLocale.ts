import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useThemeLocale } from "@theme-hope/composables/useTheme";

import type { BlogLocaleData } from "../../../shared/index.js";

export const useBlogLocaleData = (): ComputedRef<BlogLocaleData> => {
  const themeLocale = useThemeLocale();

  return computed(() => themeLocale.value.blogLocales);
};
