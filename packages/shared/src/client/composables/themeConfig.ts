import { useThemeData } from "@vuepress/plugin-theme-data/lib/client";
import { computed } from "vue";
import { _getAuthor } from "../../shared";

import type { ComputedRef } from "vue";
import type { BaseThemeConfig } from "../../shared";

export const useThemeAuthor = (): ComputedRef<string[]> =>
  computed(() => {
    const { author } = useThemeData<BaseThemeConfig>().value;

    return _getAuthor(author, false);
  });

export const useIconPrefix = (): ComputedRef<string> =>
  computed(() => {
    const { iconPrefix } = useThemeData<BaseThemeConfig>().value;

    return iconPrefix === "" ? "" : iconPrefix || "icon-";
  });

export const useBlogConfig = (): ComputedRef<unknown> =>
  computed(() => {
    const { blog } = useThemeData<BaseThemeConfig>().value;

    return blog === false ? false : blog || {};
  });

export const usePure = (): ComputedRef<boolean> =>
  computed(() => Boolean(useThemeData<BaseThemeConfig>().value.pure));
