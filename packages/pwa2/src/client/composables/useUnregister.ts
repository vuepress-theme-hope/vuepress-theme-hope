/**
 * Call `unregister()` inside current active worker
 */
export const useUnregister = (): Promise<boolean> =>
  navigator.serviceWorker.ready
    .then((registration) =>
      registration.unregister().then((found) => {
        if (found) console.log("[PWA] Current service worker unregistered");

        return found;
      })
    )
    .catch((error) => {
      console.log(
        "[PWA] Unregister current service worker failed with error:",
        error
      );

      return false;
    });
