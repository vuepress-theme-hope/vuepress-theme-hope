import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useThemeData } from "./useThemeData.js";

export const usePure = (): ComputedRef<boolean> => {
  const themeData = useThemeData();

  return computed(() => Boolean(themeData.value.pure));
};
