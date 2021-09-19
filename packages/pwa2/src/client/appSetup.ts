import { defineClientAppSetup, withBase } from "@vuepress/client";
import mitt from "mitt";
import { onMounted, provide } from "vue";
import { pwaEventSymbol } from "./composables";
import { serviceWorkerPath } from "./define";

import type { PwaEvent } from "./composables";

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __VUEPRESS_SSR__: boolean;

export default defineClientAppSetup(() => {
  if (__VUEPRESS_SSR__) return;

  // create event emitter and provide it
  const event: PwaEvent = mitt();

  provide(pwaEventSymbol, event);

  onMounted(async () => {
    if (process.env.NODE_ENV === "production") {
      const { register } = await import("register-service-worker");

      // Register service worker

      register(withBase(serviceWorkerPath), {
        ready(registration) {
          console.log("[PWA]: Service worker is active");
          event.emit("ready", registration);
        },

        registered(registration) {
          console.log("[PWA]: Service worker has been registered.");
          event.emit("registered", registration);
        },

        cached(registration) {
          console.log("[PWA]: Content has been cached for offline usage");
          event.emit("cached", registration);
        },

        updatefound(registration) {
          console.log("[PWA]: New content is downloading.");
          event.emit("updatefound", registration);
        },

        updated(registration) {
          console.log("[PWA]: New content is available, please refresh.");

          const key = "service-worker-version";
          const version = Number(localStorage.getItem(key) || 0);
          localStorage.setItem(key, (version + 1).toString());
          localStorage.removeItem("manifest");

          event.emit("updated", registration);
        },

        offline() {
          console.log(
            "[PWA]: No internet connection found. App is running in offline mode."
          );
          event.emit("offline");
        },

        error(err) {
          console.log("[PWA]: Error during service worker registration:", err);
          event.emit("error", err);
        },
      });
    }
  });
});
