import { isString } from "@vuepress/helper/client";
import { resolveRoute } from "vuepress/client";

import { useThemeLocaleData } from "@theme-hope/composables/index";
import {
  isLinkInternal,
  resolveLinkInfo,
  resolvePrefix,
} from "@theme-hope/utils/index";

import type {
  AutoLinkConfig,
  NavGroup,
  NavbarGroup,
  NavbarItem,
} from "../../../../shared/index.js";
import type { ResolvedThemeNavbarItem } from "../utils/index.js";
import { computed, type ComputedRef } from "vue";

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
          resolveNavbarItem(child, resolvePrefix(prefix, item.prefix)) as
            | NavGroup<AutoLinkConfig>
            | AutoLinkConfig,
      ),
    };

  return {
    ...item,
    link: isLinkInternal(item.link)
      ? resolveRoute(resolvePrefix(prefix, item.link)).path
      : item.link,
  };
};

export const useNavbarItems = (): ComputedRef<ResolvedThemeNavbarItem[]> => {
  const themeLocaleData = useThemeLocaleData();

  return computed(() =>
    (themeLocaleData.value.navbar || []).map((item) => resolveNavbarItem(item)),
  );
};
