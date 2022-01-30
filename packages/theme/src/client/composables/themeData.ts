import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from "@vuepress/plugin-theme-data/lib/client";
import { computed } from "vue";
import { getAuthor } from "@mr-hope/vuepress-shared/lib/client";

import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from "@vuepress/plugin-theme-data/lib/client";
import type { ComputedRef } from "vue";
import type { AuthorInfo } from "@mr-hope/vuepress-shared";
import type { HopeThemeConfig, HopeThemeLocaleConfig } from "../../shared";

export const useThemeData = (): ThemeDataRef<HopeThemeConfig> =>
  _useThemeData<HopeThemeConfig>();
export const useThemeLocaleData =
  (): ThemeLocaleDataRef<HopeThemeLocaleConfig> =>
    _useThemeLocaleData<HopeThemeLocaleConfig>();

export const useThemeAuthor = (): ComputedRef<AuthorInfo[]> =>
  computed(() => {
    const { author } = useThemeData().value;

    return getAuthor(author, false);
  });

export const useIconPrefix = (): ComputedRef<string> =>
  computed(() => useThemeData().value.iconPrefix || "");

export const usePure = (): ComputedRef<boolean> =>
  computed(() => Boolean(useThemeData().value.pure || false));
