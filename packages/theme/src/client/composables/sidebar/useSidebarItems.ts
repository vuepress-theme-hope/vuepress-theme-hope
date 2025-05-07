import type { ComputedRef, InjectionKey } from "vue";
import { computed, inject, provide } from "vue";

import { useData } from "@theme-hope/composables/useData";
import type { SidebarItem } from "@theme-hope/typings/sidebar";
import { resolveSidebarItems } from "@theme-hope/utils/sidebar/resolveSidebarItems";

import type {
  ThemeHomePageFrontmatter,
  ThemeProjectHomePageFrontmatter,
} from "../../../shared/index.js";

export type SidebarItemsRef = ComputedRef<SidebarItem[]>;

export const sidebarItemsSymbol: InjectionKey<SidebarItemsRef> = Symbol(
  __VUEPRESS_DEV__ ? "sidebarItems" : "",
);

/**
 * Create sidebar items ref and provide as global computed in setup
 */
export const setupSidebarItems = (): void => {
  const { frontmatter, routeLocale, routePath, themeLocale } = useData<
    ThemeHomePageFrontmatter | ThemeProjectHomePageFrontmatter
  >();

  // Get sidebar options from frontmatter > themeConfig
  const sidebarOptions = computed(() =>
    frontmatter.value.home
      ? false
      : (frontmatter.value.sidebar ?? themeLocale.value.sidebar ?? "structure"),
  );

  const sidebarItems = computed(() =>
    resolveSidebarItems({
      config: sidebarOptions.value,
      routeLocale: routeLocale.value,
      routePath: routePath.value,
    }),
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
