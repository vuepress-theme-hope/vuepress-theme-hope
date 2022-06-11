import { useEventListener } from "@vueuse/core";
import { onMounted, inject, ref } from "vue";
import { useThemeData } from "./themeData";

import type { App, InjectionKey, Ref } from "vue";

type IsMobile = Ref<boolean>;

export const mobileSymbol: InjectionKey<IsMobile> = Symbol.for("mobile");

export const injectMobile = (app: App): void => {
  const isMobile = ref(false);

  app.provide(mobileSymbol, isMobile);

  // provide global helpers
  Object.defineProperties(app.config.globalProperties, {
    $isMobile: { get: () => isMobile.value },
  });
};

export const useMobile = (): Ref<boolean> => {
  const isMobile = inject(mobileSymbol);

  if (!isMobile) {
    throw new Error("useMobile() is called without provider.");
  }

  return isMobile;
};

export const setupMobile = (): void => {
  const themeData = useThemeData();
  const isMobile = useMobile();

  const mobileHandler = (): void => {
    isMobile.value =
      window.innerWidth <= (themeData.value.mobileBreakPoint || 719);
  };

  useEventListener("resize", mobileHandler, false);
  useEventListener("orientationchange", mobileHandler, false);

  onMounted(() => {
    mobileHandler();
  });
};
