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
import type { HopeThemeOptions, HopeThemeLocaleData } from "../../shared";

export const useThemeData = (): ThemeDataRef<HopeThemeOptions> =>
  _useThemeData<HopeThemeOptions>();
export const useThemeLocaleData = (): ThemeLocaleDataRef<HopeThemeLocaleData> =>
  _useThemeLocaleData<HopeThemeLocaleData>();

export const useThemeAuthor = (): ComputedRef<AuthorInfo[]> =>
  computed(() => {
    const { author } = useThemeData().value;

    return getAuthor(author, false);
  });

export const useIconPrefix = (): ComputedRef<string> =>
  computed(() => {
    const { iconPrefix } = useThemeData().value;

    return iconPrefix === "" ? "" : iconPrefix || "icon-";
  });

export const useBlogConfig = (): ComputedRef<unknown> =>
  computed(() => {
    const { blog } = useThemeData().value;

    return blog === false ? false : blog || {};
  });

export const usePure = (): ComputedRef<boolean> =>
  computed(() => Boolean(useThemeData().value.pure));
