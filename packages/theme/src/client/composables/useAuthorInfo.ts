import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useThemeLocale } from "@theme-hope/composables/index";

import type { AuthorInfo } from "../../shared/index.js";

export const useAuthorInfo = (): ComputedRef<AuthorInfo> => {
  const themeLocale = useThemeLocale();

  return computed(() => themeLocale.value.author as AuthorInfo);
};
