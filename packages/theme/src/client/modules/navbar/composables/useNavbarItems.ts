import { isString } from "@vuepress/helper/client";
import type { ComputedRef } from "vue";
import { computed } from "vue";
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
  NavbarGroupOptions,
  NavbarLinkOptions,
} from "../../../../shared/index.js";
import type { NavbarItem } from "../utils/index.js";

export const resolveNavbarItem = (
  item: NavbarLinkOptions | NavbarGroupOptions | string,
  prefix = "",
): NavbarItem => {
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
            | NavGroup<AutoLinkOptions>
            | AutoLinkOptions,
      ),
    };

  return {
    ...item,
    link: isLinkInternal(item.link)
      ? resolveRoute(resolvePrefix(prefix, item.link)).path
      : item.link,
  };
};

export const useNavbarItems = (): ComputedRef<NavbarItem[]> => {
  const themeLocaleData = useThemeLocaleData();

  return computed(() =>
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    (themeLocaleData.value.navbar || []).map((item) => resolveNavbarItem(item)),
  );
};
