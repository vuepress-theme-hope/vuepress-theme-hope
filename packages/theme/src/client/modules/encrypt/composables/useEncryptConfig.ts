import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useThemeData } from "@theme-hope/composables/index";

import type { EncryptConfig } from "../../../../shared/index.js";

export const useEncryptConfig = (): ComputedRef<EncryptConfig> => {
  const theme = useThemeData();

  return computed(() => theme.value.encrypt);
};
