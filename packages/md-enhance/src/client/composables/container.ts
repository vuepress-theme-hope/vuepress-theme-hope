import { useEventListener } from "@vueuse/core";

export const useContainer = (): void => {
  // toggle all <details> open
  useEventListener("beforeprint", () => {
    document.querySelectorAll("details").forEach((detail) => {
      detail.open = true;
    });
  });
};
