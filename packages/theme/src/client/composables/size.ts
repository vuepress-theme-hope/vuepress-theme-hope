import { useEventListener } from "@vueuse/core";
import { type Ref, onMounted, ref } from "vue";

import { useThemeData } from "./themeData.js";

export interface WindowSizeRef {
  isMobile: Ref<boolean>;
  isPC: Ref<boolean>;
}

export const useWindowSize = (): WindowSizeRef => {
  const themeData = useThemeData();
  const isMobile = ref(false);
  const isPC = ref(false);

  const windowSizeHandler = (): void => {
    isMobile.value =
      window.innerWidth <= (themeData.value.mobileBreakPoint || 719);
    isPC.value = window.innerWidth >= (themeData.value.pcBreakPoint || 1440);
  };

  onMounted(() => {
    windowSizeHandler();
    useEventListener("resize", windowSizeHandler, false);
    useEventListener("orientationchange", windowSizeHandler, false);
  });

  return {
    isMobile,
    isPC,
  };
};
