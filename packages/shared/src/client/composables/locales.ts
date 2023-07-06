import { useRouteLocale } from "@vuepress/client";
import type { LocaleData } from "@vuepress/shared";
import type { ComputedRef } from "vue";
import { computed } from "vue";

import type { RequiredLocaleConfig } from "../../shared/index.js";

/**
 * Get current locale config
 *
 * @param localesConfig client locale Config
 * @returns current locale config
 */
export const useLocaleConfig = <T extends LocaleData>(
  localesConfig: RequiredLocaleConfig<T>,
): ComputedRef<T> => {
  const routeLocale = useRouteLocale();

  return computed(() => localesConfig[routeLocale.value]);
};
