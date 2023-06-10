import type { ComputedRef } from "vue";
import { computed } from "vue";

import {
  useThemeData,
  useThemeLocaleData,
} from "@theme-hope/composables/index";

import type { BlogLocaleConfig } from "../../../../shared/index.js";

export const useBlogOptions = (): ComputedRef<BlogLocaleConfig> => {
  const themeData = useThemeData();
  const themeLocale = useThemeLocaleData();

  return computed(() => ({
    ...themeData.value.blog,
    ...themeLocale.value.blog,
  }));
};
