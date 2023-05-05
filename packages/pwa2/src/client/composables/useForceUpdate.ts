import { type PWAEvent } from "./usePWAEvent.js";

export const useForceUpdate = (event: PWAEvent): void => {
  event.on("updatefound", () => {
    void navigator.serviceWorker.getRegistration().then((registration) => {
      // check whether a valid service worker is active
      if (registration && registration.active)
        // force refresh
        // @ts-ignore
        window.location.reload(true);
    });
  });
};
