import { isLinkExternal, isString } from "@vuepress/helper/client";
import type { ComputedRefWithControl } from "@vueuse/core";
import { computedWithControl } from "@vueuse/core";

import { useThemeLocaleData } from "@theme-hope/composables/index";
import { resolveLinkInfo, resolvePrefix } from "@theme-hope/utils/index";

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
      ...(item.link && !isLinkExternal(item.link)
        ? resolveLinkInfo(resolvePrefix(prefix, item.link))
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
    link: isLinkExternal(item.link)
      ? item.link
      : resolveLinkInfo(resolvePrefix(prefix, item.link)).link,
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
