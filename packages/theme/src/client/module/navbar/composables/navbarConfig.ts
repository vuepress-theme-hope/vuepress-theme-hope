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
  item: HopeThemeNavbarItem | HopeThemeNavbarGroup | string,
  prefix = ""
): ResolvedHopeThemeNavbarItem => {
  if (isString(item)) return useAutoLink(`${prefix}${item}`);

  if ("children" in item)
    return {
      ...item,
      ...(item.link && !isLinkExternal(item.link)
        ? useAutoLink(`${prefix}${item.link}`)
        : {}),
      children: item.children.map((child) =>
        resolveNavbarItem(child, `${prefix}${item.prefix || ""}`)
      ) as (HopeThemeNavGroup<AutoLink> | AutoLink)[],
    };

  return {
    ...item,
    link: isLinkExternal(item.link)
      ? item.link
      : useAutoLink(`${prefix}${item.link}`).link,
  };
};

export const useNavbarConfig = (): ComputedRef<ResolvedHopeThemeNavbarItem[]> =>
  computed(() =>
    (useThemeLocaleData().value.navbar || []).map((item) =>
      resolveNavbarItem(item)
    )
  );
