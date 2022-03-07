/**
 * Call `unregister()` inside current active worker
 */
export const useUnregister = (): Promise<boolean> =>
  navigator.serviceWorker
    .getRegistration()
    .then((registration) => {
      if (registration)
        return registration.unregister().then((found) => {
          if (found) console.log("[PWA] Current service worker unregistered");

          return found;
        });

      return false;
    })
    .catch((error) => {
      console.log(
        "[PWA] Unregister current service worker failed with error:",
        error
      );

      return false;
    });
