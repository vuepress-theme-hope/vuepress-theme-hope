import type { PWAEvent } from "./usePWAEvent";
import { useUnregister } from "./useUnregister";

export const useForceUpdate = (event: PWAEvent): void => {
  event.on("updatefound", () => {
    void useUnregister().then((isSuccess) => {
      if (isSuccess) window.location.reload();
    });
  });
};
