import { usePageFrontmatter } from "@vuepress/client";
import type { ComputedRef, InjectionKey } from "vue";
import { computed, inject, provide } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables/index";

import { resolveSidebarItems } from "./resolveConfig.js";
import type { ThemeNormalPageFrontmatter } from "../../../../shared/index.js";
import type { ResolvedSidebarItem } from "../utils/index.js";

declare const __VUEPRESS_DEV__: boolean;

export type SidebarItemsRef = ComputedRef<ResolvedSidebarItem[]>;

export const sidebarItemsSymbol: InjectionKey<SidebarItemsRef> = Symbol(
  __VUEPRESS_DEV__ ? "sidebarItems" : "",
);

/**
 * Create sidebar items ref and provide as global computed in setup
 */
export const setupSidebarItems = (): void => {
  const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
  const themeLocale = useThemeLocaleData();

  // get sidebar config from frontmatter > themeConfig
  const sidebarConfig = computed(() =>
    frontmatter.value.home
      ? false
      : frontmatter.value.sidebar ?? themeLocale.value.sidebar ?? "structure",
  );
  const headerDepth = computed(
    () => frontmatter.value.headerDepth ?? themeLocale.value.headerDepth ?? 2,
  );

  const sidebarItems = computed(() =>
    resolveSidebarItems(sidebarConfig.value, headerDepth.value),
  );

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
