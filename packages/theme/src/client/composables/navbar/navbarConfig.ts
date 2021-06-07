import { computed } from "vue";
import type { ComputedRef } from "vue";
import { isString } from "@vuepress/shared";
import type {
  NavbarItem,
  NavbarGroup,
  ResolvedNavbarItem,
} from "../../../shared";
import { useNavLink } from "../navLink";
import { useThemeLocaleData } from "../themeData";

export const resolveNavbarItem = (
  item: NavbarItem | NavbarGroup | string
): ResolvedNavbarItem => {
  if (isString(item)) return useNavLink(item);

  if ((item as NavbarGroup).children)
    return {
      ...item,
      children: (item as NavbarGroup).children.map(resolveNavbarItem),
    };

  return item as ResolvedNavbarItem;
};

export const useNavbarConfig = (): ComputedRef<ResolvedNavbarItem[]> =>
  computed(() =>
    (useThemeLocaleData().value.navbar || []).map(resolveNavbarItem)
  );
