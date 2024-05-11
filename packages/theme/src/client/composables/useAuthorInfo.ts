import type { ComputedRef } from "vue";
import { computed } from "vue";
import type { AuthorInfo } from "vuepress-shared/client";

import { useThemeLocaleData } from "@theme-hope/composables/index";

export const useAuthorInfo = (): ComputedRef<AuthorInfo> => {
  const themeLocale = useThemeLocaleData();

  return computed(() => themeLocale.value.author as AuthorInfo);
};
