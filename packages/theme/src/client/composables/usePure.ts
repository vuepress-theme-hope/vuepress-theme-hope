import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useTheme } from "@theme-hope/composables/useTheme";

export const usePure = (): ComputedRef<boolean> => {
  const theme = useTheme();

  return computed(() => Boolean(theme.value.pure));
};
