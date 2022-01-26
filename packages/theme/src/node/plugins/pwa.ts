import type { PWAOptions } from "vuepress-plugin-pwa2";

export const resolvePWAOptions = (
  options?: PWAOptions | false
): PWAOptions | false => (options === false ? false : options || {});
