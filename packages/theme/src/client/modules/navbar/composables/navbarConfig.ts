import { isLinkExternal, isString } from "@vuepress/shared";
import type { Ref } from "vue";
import { ref, watch } from "vue";
import type { Router } from "vue-router";
import { useRouter } from "vue-router";

import { useThemeLocaleData } from "@theme-hope/composables/index";
import { resolveLinkInfo } from "@theme-hope/utils/index";

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
  if (isString(item)) return resolveLinkInfo(router, `${prefix}${item}`);

  if ("children" in item)
    return {
      ...item,
      ...(item.link && !isLinkExternal(item.link)
        ? resolveLinkInfo(router, `${prefix}${item.link}`)
        : {}),
      children: item.children.map(
        (child) =>
          resolveNavbarItem(router, child, `${prefix}${item.prefix || ""}`) as
            | NavGroup<AutoLinkOptions>
            | AutoLinkOptions,
      ),
    };

  return {
    ...item,
    link: isLinkExternal(item.link)
      ? item.link
      : resolveLinkInfo(router, `${prefix}${item.link}`).link,
  };
};

export const useNavbarItems = (): Ref<ResolvedThemeNavbarItem[]> => {
  const themeLocaleData = useThemeLocaleData();
  const router = useRouter();

  const getNavbarItems = (): ResolvedThemeNavbarItem[] =>
    (themeLocaleData.value.navbar || []).map((item) =>
      resolveNavbarItem(router, item),
    );

  const navbarItems = ref(getNavbarItems());

  watch(themeLocaleData, () => {
    navbarItems.value = getNavbarItems();
  });

  return navbarItems;
};
