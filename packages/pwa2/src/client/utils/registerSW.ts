import { type Hooks } from "register-service-worker";

/**
 * Register serviceWorker under `serviceWorkerPath`
 *
 * @param serviceWorkerPath Service Worker path
 * @param hooks Service worker hooks
 * @param showStatus Whether to show status in console
 *
 * 在 `serviceWorkerPath` 下注册 Service Worker
 *
 * @param serviceWorkerPath Service Worker 路径
 * @param hooks Service Worker 钩子
 * @param showStatus 是否在控制台显示状态
 */
export const registerSW = async (
  serviceWorkerPath: string,
  hooks: Hooks = {},
  showStatus = true
): Promise<void> => {
  const { register } = await import(
    /* webpackChunkName: "register-service-worker" */ "register-service-worker"
  );

  // Register service worker
  register(serviceWorkerPath, {
    ready(registration) {
      if (showStatus) console.info("[Service Worker]: active");
      hooks.ready?.(registration);
    },

    registered(registration) {
      if (showStatus) console.log("[Service Worker]: registered");
      hooks.registered?.(registration);
    },

    cached(registration) {
      if (showStatus) console.log("[Service Worker]: cached");
      hooks.cached?.(registration);
    },

    async updatefound(registration) {
      if (await navigator.serviceWorker.getRegistration()) {
        if (showStatus) console.log("[Service Worker]: update found");
        hooks.updatefound?.(registration);
      }
    },

    updated(registration) {
      if (showStatus) console.log("[Service Worker]: updated");
      hooks.updated?.(registration);
    },

    offline() {
      if (showStatus) console.log("[Service Worker]: offline");
      hooks.offline?.();
    },

    error(err) {
      if (showStatus) console.error("[Service Worker]: ", err);
      hooks.error?.(err);
    },
  });
};
