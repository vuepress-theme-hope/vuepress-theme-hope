import { computed } from "vue";
import { useThemeData, useThemeLocaleData } from "@theme-hope/composables";

import type { ComputedRef } from "vue";
import type { HopeThemeBlogConfig } from "../../../../shared";

export const useEnableBlog = (): ComputedRef<boolean> => {
  const themeData = useThemeData();

  return computed(() => themeData.value.enableBlog);
};

export const useBlogOptions = (): ComputedRef<HopeThemeBlogConfig> => {
  const themeLocale = useThemeLocaleData();

  return computed(() => themeLocale.value.blog);
};
