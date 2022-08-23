import { computed } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables";

import type { ComputedRef } from "vue";
import type { HopeThemeMetaLocateData } from "../../../../shared";

export const useMetaLocale = (): ComputedRef<HopeThemeMetaLocateData> => {
  const themeLocale = useThemeLocaleData();

  return computed(() => themeLocale.value.metaLocales);
};
