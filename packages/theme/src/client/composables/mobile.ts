import { useEventListener } from "@vueuse/core";
import { onMounted, ref } from "vue";
import { useThemeData } from "./themeData";

import type { Ref } from "vue";

export const useMobile = (): Ref<boolean> => {
  const themeData = useThemeData();
  const isMobile = ref(false);

  const mobileHandler = (): void => {
    isMobile.value =
      window.innerWidth <= (themeData.value.mobileBreakPoint || 719);
  };

  onMounted(() => {
    mobileHandler();
    useEventListener("resize", mobileHandler, false);
    useEventListener("orientationchange", mobileHandler, false);
  });

  return isMobile;
};
