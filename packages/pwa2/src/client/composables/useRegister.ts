import { withBase } from "@vuepress/client";

import type { PWAEvent } from "./usePWAEvent";

declare const SW_PATH: string;

export const useRegister = async (event: PWAEvent): Promise<void> => {
  const { register } = await import("register-service-worker");

  // Register service worker
  register(withBase(SW_PATH), {
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
};
