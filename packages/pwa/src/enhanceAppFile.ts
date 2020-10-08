/* global SW_BASE_URL */
import VueCompositionAPI from "@vue/composition-api";
import event from "./event";

import SWUpdateEvent from "./SWUpdateEvent";
import SWUpdatePopup from "./SWUpdatePopup.vue";

import { EnhanceApp } from "@mr-hope/vuepress-types";

// eslint-disable-next-line @typescript-eslint/naming-convention
const enhanceApp: EnhanceApp = async ({ Vue, router, isServer }) => {
  Vue.use(VueCompositionAPI);
  Vue.component("SWUpdatePopup", SWUpdatePopup);
  if (process.env.NODE_ENV === "production" && !isServer) {
    const { register } = await import("register-service-worker");

    // Register service worker
    router.onReady(() => {
      register(`${SW_BASE_URL}service-worker.js`, {
        registrationOptions: {},
        ready() {
          console.log("[PWA]: Service worker 已激活");
          event.$emit("sw-ready");
        },

        cached(registration) {
          console.log("[PWA]: 内容以被缓存以离线使用");
          event.$emit("sw-cached", new SWUpdateEvent(registration));
        },

        updated(registration) {
          console.log("[PWA]: 内容已更新");
          event.$emit("sw-updated", new SWUpdateEvent(registration));
        },

        offline() {
          console.log("[PWA]: 无网络链接，APP 以离线模式启动");
          event.$emit("sw-offline");
        },

        error(err) {
          console.error("[PWA]: 注册 Service Worker 出现错误:", err);
          event.$emit("sw-error", err);
        },
      });
    });
  }
};

export default enhanceApp;
