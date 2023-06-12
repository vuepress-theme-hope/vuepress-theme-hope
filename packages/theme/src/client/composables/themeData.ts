import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from "@vuepress/plugin-theme-data/client";
import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from "@vuepress/plugin-theme-data/client";
import type { ComputedRef } from "vue";
import { computed } from "vue";
import type { AuthorInfo } from "vuepress-shared/client";
import { getAuthor } from "vuepress-shared/client";

import type { ThemeData, ThemeLocaleConfig } from "../../shared/index.js";

export const useThemeData = (): ThemeDataRef<ThemeData> =>
  _useThemeData<ThemeData>();
export const useThemeLocaleData = (): ThemeLocaleDataRef<ThemeLocaleConfig> =>
  _useThemeLocaleData<ThemeLocaleConfig>();

export const useThemeAuthor = (): ComputedRef<AuthorInfo[]> => {
  const themeLocale = useThemeLocaleData();

  return computed(() => getAuthor(themeLocale.value.author, false));
};

export const usePure = (): ComputedRef<boolean> =>
  computed(() => Boolean(useThemeData().value.pure));
