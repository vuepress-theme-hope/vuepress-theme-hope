import { useRouteLocale } from "@vuepress/client";
import { computed } from "vue";

import type { ComputedRef } from "vue";
import type { ConvertLocaleConfig } from "../../shared";

/**
 * Get current locale config
 *
 * @param localesConfig client locale Config
 * @returns current locale config
 */
export const useLocaleConfig = <T>(
  localesConfig: ConvertLocaleConfig<T>
): ComputedRef<T> => {
  const routeLocale = useRouteLocale();

  return computed(() => localesConfig[routeLocale.value]);
};
