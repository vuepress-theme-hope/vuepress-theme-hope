import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useThemeLocale } from "@theme-hope/composables/useTheme";
import { useWindowSize } from "@theme-hope/composables/useWindowSize";

export const useNavbarAutoHide = (): ComputedRef<boolean> => {
  const themeLocale = useThemeLocale();
  const { isMobile } = useWindowSize();

  return computed(() => {
    const { navbarAutoHide = "mobile" } = themeLocale.value;

    return navbarAutoHide !== "none" && (navbarAutoHide === "always" || isMobile.value);
  });
};
