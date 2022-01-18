import { computed } from "vue";
import { resolveNavbarItem } from "../navLink";
import { useThemeLocaleData } from "../themeData";

import type { ComputedRef } from "vue";
import type {
  HopeThemeNavbarConfig,
  ResolvedNavbarItem,
} from "../../../shared";

export const useNavbarLocaleData = (): ComputedRef<HopeThemeNavbarConfig> =>
  computed(() => useThemeLocaleData().value.navbar || {});

export const useNavbarConfig = (): ComputedRef<ResolvedNavbarItem[]> =>
  computed(() =>
    (useNavbarLocaleData().value.config || []).map(resolveNavbarItem)
  );
