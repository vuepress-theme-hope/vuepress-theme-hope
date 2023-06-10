import { useEventListener } from "@vueuse/core";
import type { Ref } from "vue";
import { onMounted, ref } from "vue";

import cssVariables from "../styles/variables.module.scss?module";

const { mobileBreakPoint, pcBreakPoint } = cssVariables;

export interface WindowSizeRef {
  isMobile: Ref<boolean>;
  isPC: Ref<boolean>;
}

const getPixels = (length: string): number | null =>
  length.endsWith("px") ? Number(length.slice(0, -2)) : null;

export const useWindowSize = (): WindowSizeRef => {
  const isMobile = ref(false);
  const isPC = ref(false);

  const windowSizeHandler = (): void => {
    isMobile.value = window.innerWidth <= (getPixels(mobileBreakPoint) ?? 719);
    isPC.value = window.innerWidth >= (getPixels(pcBreakPoint) ?? 1440);
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
