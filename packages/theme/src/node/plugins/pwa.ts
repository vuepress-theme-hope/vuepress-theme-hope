import type { PWAOptions } from "vuepress-plugin-pwa2";

export const resolvePWAOptions = (
  options?: PWAOptions | boolean
): PWAOptions | false => (options === true ? {} : options || false);
