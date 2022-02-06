import { isLinkExternal, isString } from "@vuepress/shared";
import { computed } from "vue";

import { useAutoLink, useThemeLocaleData } from "@theme-hope/composables";

import type { ComputedRef } from "vue";
import type {
  AutoLink,
  HopeThemeNavbarItem,
  HopeThemeNavbarGroup,
  HopeThemeNavGroup,
  ResolvedHopeThemeNavbarItem,
} from "../../../../shared";

export const resolveNavbarItem = (
  item: HopeThemeNavbarItem | HopeThemeNavbarGroup | string
): ResolvedHopeThemeNavbarItem => {
  if (isString(item)) return useAutoLink(item);

  if ("children" in item)
    return {
      ...item,
      ...(item.link && !isLinkExternal(item.link)
        ? useAutoLink(item.link)
        : {}),
      children: item.children.map(resolveNavbarItem) as (
        | HopeThemeNavGroup<AutoLink>
        | AutoLink
      )[],
    };

  return {
    ...item,
    link: isLinkExternal(item.link) ? item.link : useAutoLink(item.link).link,
  };
};

export const useNavbarConfig = (): ComputedRef<ResolvedHopeThemeNavbarItem[]> =>
  computed(() =>
    (useThemeLocaleData().value.navbar || []).map(resolveNavbarItem)
  );
