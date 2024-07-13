import { isPlainObject, isString } from "@vuepress/helper/client";
import type { ComputedRef } from "vue";
import { computed } from "vue";
import { resolveRoute, usePageFrontmatter, useRoute } from "vuepress/client";

import { useSidebarItems } from "@theme-hope/modules/sidebar/composables/index";
import type { SidebarItem } from "@theme-hope/modules/sidebar/utils/index";
import { resolveLinkInfo } from "@theme-hope/utils/index";

import { useThemeLocaleData } from "./useThemeData.js";
import type {
  AutoLinkOptions,
  ThemeNormalPageFrontmatter,
} from "../../shared/index.js";

const resolveFromFrontmatterConfig = (
  config: unknown,
  currentPath: string,
): AutoLinkOptions | null | false =>
  config === false
    ? config
    : isPlainObject<AutoLinkOptions>(config)
      ? {
          ...config,
          link: resolveLinkInfo(config.link, true, currentPath).link,
        }
      : isString(config)
        ? resolveLinkInfo(config, true, currentPath)
        : null;

/**
 * Resolve `prev` or `next` config from sidebar items
 */
const resolveFromSidebarItems = (
  sidebarItems: SidebarItem[],
  currentPath: string,
  offset: number,
): AutoLinkOptions | null => {
  const linkIndex = sidebarItems.findIndex((item) => item.link === currentPath);

  if (linkIndex !== -1) {
    const targetItem = sidebarItems[linkIndex + offset];

    if (!targetItem) return null;

    if (targetItem.link) return targetItem as AutoLinkOptions;

    if ("prefix" in targetItem && !resolveRoute(targetItem.prefix).notFound)
      return {
        ...targetItem,
        link: targetItem.prefix,
      };

    return null;
  }

  for (const item of sidebarItems)
    if ("children" in item) {
      const childResult = resolveFromSidebarItems(
        item.children,
        currentPath,
        offset,
      );

      if (childResult) return childResult;
    }

  const prefixIndex = sidebarItems.findIndex(
    (item) => "prefix" in item && item.prefix === currentPath,
  );

  if (prefixIndex !== -1) {
    const targetItem = sidebarItems[prefixIndex + offset];

    if (!targetItem) return null;

    if (targetItem.link) return targetItem as AutoLinkOptions;

    if ("prefix" in targetItem && !resolveRoute(targetItem.prefix).notFound)
      return {
        ...targetItem,
        link: targetItem.prefix,
      };

    return null;
  }

  return null;
};

interface RelatedLinks {
  prevLink: ComputedRef<AutoLinkOptions | null>;
  nextLink: ComputedRef<AutoLinkOptions | null>;
}

export const useRelatedLinks = (): RelatedLinks => {
  const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
  const themeLocale = useThemeLocaleData();
  const sidebarItems = useSidebarItems();
  const route = useRoute();

  const prevLink = computed(() => {
    const prevConfig = resolveFromFrontmatterConfig(
      frontmatter.value.prev,
      route.path,
    );

    return prevConfig === false
      ? null
      : (prevConfig ??
          (themeLocale.value.prevLink === false
            ? null
            : resolveFromSidebarItems(sidebarItems.value, route.path, -1)));
  });

  const nextLink = computed(() => {
    const nextConfig = resolveFromFrontmatterConfig(
      frontmatter.value.next,
      route.path,
    );

    return nextConfig === false
      ? null
      : (nextConfig ??
          (themeLocale.value.nextLink === false
            ? null
            : resolveFromSidebarItems(sidebarItems.value, route.path, 1)));
  });

  return {
    prevLink,
    nextLink,
  };
};
