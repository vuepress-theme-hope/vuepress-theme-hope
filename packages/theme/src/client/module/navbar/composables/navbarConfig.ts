import { isLinkExternal, isString } from "@vuepress/shared";
import { computed } from "vue";

import { useAutoLink, useThemeLocaleData } from "@theme-hope/composables";

import type { ComputedRef } from "vue";
import type {
  AutoLink,
  NavbarItem,
  NavbarGroup,
  NavGroup,
  ResolvedNavbarItem,
} from "../../../../shared";

export const resolveNavbarItem = (
  item: NavbarItem | NavbarGroup | string
): ResolvedNavbarItem => {
  if (isString(item)) return useAutoLink(item);

  if ("children" in item)
    return {
      ...item,
      ...(item.link && !isLinkExternal(item.link)
        ? useAutoLink(item.link)
        : {}),
      children: item.children.map(resolveNavbarItem) as (
        | NavGroup<AutoLink>
        | AutoLink
      )[],
    };

  return {
    ...item,
    link: isLinkExternal(item.link) ? item.link : useAutoLink(item.link).link,
  };
};

export const useNavbarConfig = (): ComputedRef<ResolvedNavbarItem[]> =>
  computed(() =>
    (useThemeLocaleData().value.navbar || []).map(resolveNavbarItem)
  );
