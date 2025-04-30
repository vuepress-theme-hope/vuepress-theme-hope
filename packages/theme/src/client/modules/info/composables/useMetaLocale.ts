import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useThemeLocale } from "@theme-hope/composables/index";

import type { MetaLocateData } from "../../../../shared/index.js";

export const useMetaLocale = (): ComputedRef<MetaLocateData> => {
  const themeLocale = useThemeLocale();

  return computed(() => themeLocale.value.metaLocales);
};
