import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables/index";

import type { AuthorInfo } from "../../shared/index.js";

export const useAuthorInfo = (): ComputedRef<AuthorInfo> => {
  const themeLocale = useThemeLocaleData();

  return computed(() => themeLocale.value.author as AuthorInfo);
};
