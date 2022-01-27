import { computed } from "vue";
import { resolveNavbarItem } from "../navLink";
import { useThemeLocaleData } from "../themeData";

import type { ComputedRef } from "vue";
import type { ResolvedNavbarItem } from "../../../shared";

export const useNavbarConfig = (): ComputedRef<ResolvedNavbarItem[]> =>
  computed(() =>
    (useThemeLocaleData().value.navbar || []).map(resolveNavbarItem)
  );
