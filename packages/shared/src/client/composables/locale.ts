import { useRouteLocale } from "@vuepress/client";
import { computed } from "vue";

import type { ComputedRef } from "vue";
import type { ResolvedLocaleConfig } from "../../shared";

/**
 * Get current locale config
 *
 * @param i18nConfig Client I18n Config
 * @returns current locale config
 */
export const useLocaleConfig = <T>(
  i18nConfig: ResolvedLocaleConfig<T>
): ComputedRef<T> => {
  const routeLocale = useRouteLocale();

  return computed(() => i18nConfig[routeLocale.value]);
};
