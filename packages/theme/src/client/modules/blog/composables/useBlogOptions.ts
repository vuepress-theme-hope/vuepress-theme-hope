import type { ComputedRef } from "vue";
import { computed } from "vue";

import {
  useThemeData,
  useThemeLocaleData,
} from "@theme-hope/composables/index";

import type { BlogLocaleConfig } from "../../../../shared/index.js";

export const useBlogOptions = (): ComputedRef<BlogLocaleConfig> => {
  const theme = useThemeData();
  const themeLocale = useThemeLocaleData();

  return computed(() => ({
    ...theme.value.blog,
    ...themeLocale.value.blog,
  }));
};
