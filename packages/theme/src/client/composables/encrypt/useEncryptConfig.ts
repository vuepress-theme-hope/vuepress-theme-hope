import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useTheme } from "@theme-hope/composables/useTheme";

import type { EncryptConfig } from "../../../shared/index.js";

export const useEncryptConfig = (): ComputedRef<EncryptConfig> => {
  const theme = useTheme();

  return computed(() => theme.value.encrypt);
};
