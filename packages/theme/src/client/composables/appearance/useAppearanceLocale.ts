import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useThemeLocale } from "@theme-hope/composables/useTheme";

import type { OutlookLocaleData } from "../../../shared/index.js";

export const useAppearanceLocale = (): ComputedRef<OutlookLocaleData> => {
  const themeLocale = useThemeLocale();

  return computed(() => themeLocale.value.outlookLocales);
};
