import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useThemeData } from "./useThemeData.js";

export const usePure = (): ComputedRef<boolean> => {
  const theme = useThemeData();

  return computed(() => Boolean(theme.value.pure));
};
