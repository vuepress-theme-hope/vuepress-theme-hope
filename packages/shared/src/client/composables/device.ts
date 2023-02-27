import { useSupported } from "@vueuse/core";
import { type ComputedRef, type Ref, computed } from "vue";

export const useSupportUserAgent = (): Ref<boolean> =>
  useSupported(
    () =>
      typeof window !== "undefined" &&
      window.navigator &&
      "userAgent" in window.navigator
  );

export const useIsMobile = (): ComputedRef<boolean> => {
  const supportUserAgent = useSupportUserAgent();

  return computed(
    () =>
      supportUserAgent.value &&
      /\b(?:Android|iPhone)/i.test(navigator.userAgent)
  );
};
