import { useEventListener } from "@vueuse/core";

export const useHint = (): void => {
  // toggle all <details> open
  useEventListener("beforeprint", () => {
    document.querySelectorAll("details").forEach((detail) => {
      detail.open = true;
    });
  });
};
