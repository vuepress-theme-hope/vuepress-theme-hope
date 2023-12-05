import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables/index";

import type { MetaLocateData } from "../../../../shared/index.js";

export const useMetaLocale = (): ComputedRef<MetaLocateData> => {
  const themeLocale = useThemeLocaleData();

  return computed(() => themeLocale.value.metaLocales);
};
