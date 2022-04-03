import { computed } from "vue";

import { useThemeData } from "@theme-hope/composables";

import type { ComputedRef } from "vue";
import type { HopeThemeEncryptConfig } from "../../../../shared";

export const useEncryptData = (): ComputedRef<HopeThemeEncryptConfig> => {
  const themeData = useThemeData();

  return computed(() => themeData.value.encrypt || {});
};
