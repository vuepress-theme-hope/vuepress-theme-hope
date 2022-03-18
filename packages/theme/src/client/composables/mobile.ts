import { onMounted, onUnmounted, ref } from "vue";
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
    window.addEventListener("orientationchange", mobileHandler, false);
    window.addEventListener("resize", mobileHandler, false);
  });

  onUnmounted(() => {
    window.removeEventListener("orientationchange", mobileHandler, false);
    window.removeEventListener("resize", mobileHandler, false);
  });

  return isMobile;
};
