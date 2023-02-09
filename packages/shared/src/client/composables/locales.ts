import { useSiteData } from "@vuepress/client";
import { type LocaleData, resolveLocalePath } from "@vuepress/shared";
import { type ComputedRef, computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { type RequiredLocaleConfig } from "../../shared/index.js";

/**
 * Get current locale config
 *
 * @param localesConfig client locale Config
 * @returns current locale config
 */
// FIXME: workaround for https://github.com/vuepress/vuepress-next/issues/1252
export const useLocaleConfig = <T extends LocaleData>(
  localesConfig: RequiredLocaleConfig<T>
): ComputedRef<T> => {
  const route = useRoute();
  const routeLocale = ref("/");
  const siteData = useSiteData();

  const locale = computed(() => localesConfig[routeLocale.value]);

  watch(
    () => siteData.value,
    () => {
      routeLocale.value = resolveLocalePath(siteData.value.locales, route.path);
    }
  );

  watch(
    () => route.path,
    () => {
      routeLocale.value = resolveLocalePath(siteData.value.locales, route.path);
    },
    { immediate: true }
  );

  return locale;
};
