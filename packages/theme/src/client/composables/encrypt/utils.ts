import { computed } from "vue";
import { useThemeData } from "../themeData";

import type { ComputedRef } from "vue";
import type { HopeThemeEncryptOptions } from "../../../shared";

export const useEncryptOptions = (): ComputedRef<HopeThemeEncryptOptions> => {
  const themeData = useThemeData();

  return computed(() => themeData.value.encrypt || {});
};
