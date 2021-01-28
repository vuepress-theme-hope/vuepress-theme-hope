import type { VueConstructor } from "vue";
import type VueRouter, { RouterOptions } from "vue-router";
import type { SiteData } from "./context";

export type EnhanceApp = (options: {
  Vue: VueConstructor;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Record<string, any>;
  router: VueRouter & { options: RouterOptions };
  siteData: SiteData;
  isServer: boolean;
}) => void;
