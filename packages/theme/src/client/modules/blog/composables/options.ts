import { computed } from "vue";
import {
  useThemeData,
  useThemeLocaleData,
} from "@theme-hope/composables/index.js";

import type { ComputedRef } from "vue";
import type { HopeThemeBlogConfig } from "../../../../shared/index.js";

export const useBlogOptions = (): ComputedRef<HopeThemeBlogConfig> => {
  const themeData = useThemeData();
  const themeLocale = useThemeLocaleData();

  return computed(() => ({
    ...themeData.value.blog,
    ...themeLocale.value.blog,
  }));
};
