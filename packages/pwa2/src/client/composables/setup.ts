import mitt from "mitt";
import { onMounted, provide } from "vue";

import { useForceUpdate } from "./useForceUpdate.js";
import { pwaEventSymbol } from "./usePWAEvent.js";
import { useRegister } from "./useRegister.js";

import { type PWAEvent } from "./index.js";

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __VUEPRESS_DEV__: boolean;
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __VUEPRESS_SSR__: boolean;
declare const SW_FORCE_UPDATE: boolean;

export const setupPWA = (): void => {
  if (__VUEPRESS_SSR__) return;

  // create event emitter and provide it
  const event: PWAEvent = mitt();

  provide(pwaEventSymbol, event);

  onMounted(async () => {
    if (__VUEPRESS_DEV__) return;

    let refreshing = false;

    // only listen controllerchange event when a serviceWorker is active
    if (navigator.serviceWorker?.controller)
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (refreshing) return;

        refreshing = true;
        window.location.reload();
      });

    if (SW_FORCE_UPDATE) useForceUpdate(event);

    await useRegister(event);
  });
};
