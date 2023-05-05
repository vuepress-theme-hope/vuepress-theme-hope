import {
  type ComputedRef,
  type InjectionKey,
  computed,
  inject,
  provide,
} from "vue";

import { resolveSidebarItems } from "./resolveConfig.js";
import { type ResolvedSidebarItem } from "../utils/index.js";

declare const __VUEPRESS_DEV__: boolean;

export type SidebarItemsRef = ComputedRef<ResolvedSidebarItem[]>;

export const sidebarItemsSymbol: InjectionKey<SidebarItemsRef> = Symbol(
  __VUEPRESS_DEV__ ? "sidebarItems" : ""
);

/**
 * Create sidebar items ref and provide as global computed in setup
 */
export const setupSidebarItems = (): void => {
  const sidebarItems = computed(() => resolveSidebarItems());

  provide(sidebarItemsSymbol, sidebarItems);
};

/**
 * Inject sidebar items global computed
 */
export const useSidebarItems = (): SidebarItemsRef => {
  const sidebarItems = inject(sidebarItemsSymbol);

  if (!sidebarItems)
    throw new Error("useSidebarItems() is called without provider.");

  return sidebarItems;
};
