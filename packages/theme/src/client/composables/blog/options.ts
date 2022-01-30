import { computed } from "vue";
import { useThemeData, useThemeLocaleData } from "../themeData";

import type { ComputedRef } from "vue";
import type { HopeThemeBlogConfig } from "../../../shared";

export const useBlogOptions = (): ComputedRef<HopeThemeBlogConfig | null> => {
  const themeData = useThemeData();
  const themeLocale = useThemeLocaleData();

  return computed(() =>
    themeData.value.enableBlog ? themeLocale.value.blog : null
  );
};
