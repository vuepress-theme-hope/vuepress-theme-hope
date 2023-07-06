import mitt from "mitt";
import { onMounted, provide } from "vue";

import { pwaEventSymbol } from "./usePWAEvent.js";
import { useRegisterSW } from "./useRegisterSW.js";
import { forceUpdate } from "../utils/index.js";

import type { PWAEvent } from "./index.js";

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __VUEPRESS_DEV__: boolean;
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __VUEPRESS_SSR__: boolean;
declare const SW_FORCE_UPDATE: boolean;

export const setupPWA = (): void => {
  if (__VUEPRESS_SSR__) return;

  // create event emitter and provide it
  // FIXME: Types issue
  const event: PWAEvent = (mitt as unknown as typeof mitt.default)();

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

    if (SW_FORCE_UPDATE) forceUpdate();

    await useRegisterSW(event);
  });
};
