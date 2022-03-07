import { defineClientAppSetup } from "@vuepress/client";
import mitt from "mitt";
import { onMounted, provide } from "vue";
import { pwaEventSymbol, useForceUpdate, useRegister } from "./composables";
import type { PWAEvent } from "./composables";

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __VUEPRESS_SSR__: boolean;
declare const SW_FORCE_UPDATE: boolean;

export default defineClientAppSetup(() => {
  if (__VUEPRESS_SSR__) return;

  // create event emitter and provide it
  const event: PWAEvent = mitt();

  provide(pwaEventSymbol, event);

  onMounted(async () => {
    if (process.env.NODE_ENV === "production") {
      let refreshing = false;

      // only listen controllerchange event when a serviceWorker is actived
      if (navigator.serviceWorker.controller)
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (refreshing) return;

          refreshing = true;
          window.location.reload();
        });

      if (SW_FORCE_UPDATE) useForceUpdate(event);

      await useRegister(event);
    }
  });
});
