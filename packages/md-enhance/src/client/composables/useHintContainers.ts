import { useEventListener } from "@vueuse/core";

export const useHintContainers = (): void => {
  // Toggle all <details> open
  useEventListener("beforeprint", () => {
    document.querySelectorAll("details").forEach((detail) => {
      detail.open = true;
    });
  });
};
