import { isLinkExternal, isString } from "@vuepress/shared";
import type { ComputedRefWithControl } from "@vueuse/core";
import { computedWithControl } from "@vueuse/core";
import type { Router } from "vue-router";
import { useRouter } from "vue-router";

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
  router: Router,
  item: NavbarItem | NavbarGroup | string,
  prefix = "",
): ResolvedThemeNavbarItem => {
  if (isString(item))
    return resolveLinkInfo(router, resolvePrefix(prefix, item));

  if ("children" in item)
    return {
      ...item,
      ...(item.link && !isLinkExternal(item.link)
        ? resolveLinkInfo(router, resolvePrefix(prefix, item.link))
        : {}),
      children: item.children.map(
        (child) =>
          resolveNavbarItem(
            router,
            child,
            resolvePrefix(prefix, item.prefix),
          ) as NavGroup<AutoLinkOptions> | AutoLinkOptions,
      ),
    };

  return {
    ...item,
    link: isLinkExternal(item.link)
      ? item.link
      : resolveLinkInfo(router, resolvePrefix(prefix, item.link)).link,
  };
};

export const useNavbarItems = (): ComputedRefWithControl<
  ResolvedThemeNavbarItem[]
> => {
  const themeLocaleData = useThemeLocaleData();
  const router = useRouter();

  const getNavbarItems = (): ResolvedThemeNavbarItem[] =>
    (themeLocaleData.value.navbar || []).map((item) =>
      resolveNavbarItem(router, item),
    );

  const navbarItems = computedWithControl(
    () => themeLocaleData.value.navbar,
    () => getNavbarItems(),
  );

  return navbarItems;
};
