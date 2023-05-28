/**
 * Force update page content
 *
 * 强制更新页面内容
 */
export const forceUpdate = (): void => {
  void navigator.serviceWorker.getRegistration().then((registration) => {
    // check whether a valid service worker is active
    if (registration && registration.active)
      registration?.addEventListener("updatefound", () => {
        // force refresh
        // @ts-ignore
        window.location.reload(true);
      });
  });
};
