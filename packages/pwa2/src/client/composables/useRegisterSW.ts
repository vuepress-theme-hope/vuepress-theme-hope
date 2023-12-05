import { withBase } from "@vuepress/client";

import type { PWAEvent } from "./usePWAEvent.js";
import { registerSW } from "../utils/index.js";

declare const SW_PATH: string;

export const useRegisterSW = async (event: PWAEvent): Promise<void> =>
  registerSW(withBase(SW_PATH), {
    ready(registration) {
      event.emit("ready", registration);
    },

    registered(registration) {
      event.emit("registered", registration);
    },

    cached(registration) {
      event.emit("cached", registration);
    },

    updatefound(registration) {
      event.emit("updatefound", registration);
    },

    updated(registration) {
      const key = "service-worker-version";
      const version = Number(localStorage.getItem(key) || 0);

      localStorage.setItem(key, (version + 1).toString());
      localStorage.removeItem("manifest");

      event.emit("updated", registration);
    },

    offline() {
      event.emit("offline");
    },

    error(err) {
      event.emit("error", err);
    },
  });
