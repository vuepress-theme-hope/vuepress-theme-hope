import SWUpdateEvent from "./SWUpdateEvent";
import PWAInstall from "./PWAInstall.vue";
import SWUpdatePopup from "./SWUpdatePopup.vue";
import { event } from "./event";

import type { EnhanceApp } from "@mr-hope/vuepress-types";

const enhanceApp: EnhanceApp = async ({ Vue, router, isServer }) => {
  Vue.component("PWAInstall", PWAInstall);
  Vue.component("SWUpdatePopup", SWUpdatePopup);

  if (process.env.NODE_ENV === "production" && !isServer) {
    const { register } = await import("register-service-worker");

    // Register service worker
    router.onReady(() => {
      register(`${SW_BASE_URL}service-worker.js`, {
        registrationOptions: {},
        ready() {
          console.log("[PWA]: Service worker is active");
          event.$emit("sw-ready");
        },

        cached(registration) {
          console.log("[PWA]: Content has been cached for offline usage");
          event.$emit("sw-cached", new SWUpdateEvent(registration));
        },

        updated(registration) {
          console.log("[PWA]: Content has been updated");
          const key = "service-worker-version";
          const version = Number(localStorage.getItem(key) || 0);
          localStorage.setItem(key, (version + 1).toString());
          localStorage.removeItem("manifest");
          event.$emit("sw-updated", new SWUpdateEvent(registration));
        },

        offline() {
          console.log(
            "[PWA]: No internet connection，APP runs in offline mode"
          );
          event.$emit("sw-offline");
        },

        error(err) {
          console.error("[PWA]: Register Service Worker error:", err);
          event.$emit("sw-error", err);
        },
      });
    });
  }
};

export default enhanceApp;
