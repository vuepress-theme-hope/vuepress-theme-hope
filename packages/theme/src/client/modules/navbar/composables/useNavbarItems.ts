import { isString } from "@vuepress/helper/client";
import type { ComputedRefWithControl } from "@vueuse/core";
import { computedWithControl } from "@vueuse/core";
import { resolveRoute } from "vuepress/client";

import { useThemeLocaleData } from "@theme-hope/composables/index";
import {
  isLinkInternal,
  resolveLinkInfo,
  resolvePrefix,
} from "@theme-hope/utils/index";

import type {
  AutoLinkOptions,
  NavGroup,
  NavbarGroup,
  NavbarItem,
} from "../../../../shared/index.js";
import type { ResolvedThemeNavbarItem } from "../utils/index.js";

export const resolveNavbarItem = (
  item: NavbarItem | NavbarGroup | string,
  prefix = "",
): ResolvedThemeNavbarItem => {
  if (isString(item)) return resolveLinkInfo(resolvePrefix(prefix, item));

  if ("children" in item)
    return {
      ...item,
      ...(item.link && isLinkInternal(item.link)
        ? { link: resolveRoute(resolvePrefix(prefix, item.link)).path }
        : {}),
      children: item.children.map(
        (child) =>
          <NavGroup<AutoLinkOptions> | AutoLinkOptions>(
            resolveNavbarItem(child, resolvePrefix(prefix, item.prefix))
          ),
      ),
    };

  return {
    ...item,
    link: isLinkInternal(item.link)
      ? resolveRoute(resolvePrefix(prefix, item.link)).path
      : item.link,
  };
};

export const useNavbarItems = (): ComputedRefWithControl<
  ResolvedThemeNavbarItem[]
> => {
  const themeLocaleData = useThemeLocaleData();

  const getNavbarItems = (): ResolvedThemeNavbarItem[] =>
    (themeLocaleData.value.navbar || []).map((item) => resolveNavbarItem(item));

  const navbarItems = computedWithControl(
    () => themeLocaleData.value.navbar,
    () => getNavbarItems(),
  );

  return navbarItems;
};
