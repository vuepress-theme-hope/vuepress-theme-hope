import { computed } from "vue";
import { resolveNavbarItem } from "../navLink";
import { useThemeData } from "@vuepress/plugin-theme-data/lib/client";
import { useThemeLocaleData } from "../themeData";

import type { ComputedRef } from "vue";
import type {
  HopeThemeOptions,
  HopeThemeNavbarLocaleOptions,
  ResolvedNavbarItem,
} from "../../../shared";

export const useNavbarLocaleData =
  (): ComputedRef<HopeThemeNavbarLocaleOptions> =>
    computed(() => ({
      // these config needs to be merged manually
      ...useThemeData<HopeThemeOptions>().value.navbar,
      ...useThemeLocaleData().value.navbar,
    }));

export const useNavbarConfig = (): ComputedRef<ResolvedNavbarItem[]> =>
  computed(() =>
    (useNavbarLocaleData().value.config || []).map(resolveNavbarItem)
  );
