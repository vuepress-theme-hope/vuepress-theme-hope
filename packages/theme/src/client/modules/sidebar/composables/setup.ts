import { computed, inject, provide } from "vue";
import { resolveSidebarItems } from "./resolveConfig.js";

import type { ComputedRef, InjectionKey } from "vue";
import type { ResolvedSidebarItem } from "../../../../shared/index.js";

export type SidebarItemsRef = ComputedRef<ResolvedSidebarItem[]>;

export const sidebarItemsSymbol: InjectionKey<SidebarItemsRef> =
  Symbol.for("sidebarItems");

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

  if (!sidebarItems) {
    throw new Error("useSidebarItems() is called without provider.");
  }

  return sidebarItems;
};
