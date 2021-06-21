import { computed, defineComponent, h } from "vue";
import { useRoute } from "vue-router";
import { usePageFrontmatter } from "@vuepress/client";
import { isPlainObject, isString } from "@vuepress/shared";
import NavLink from "./NavLink";
import { PrevIcon, NextIcon } from "./icons";
import { useNavLink, useSidebarItems } from "../composables";

import type { VNode } from "vue";
import type {
  HopeThemeNormalPageFrontmatter,
  NavLink as NavLinkType,
  ResolvedSidebarItem,
} from "../../shared";

/**
 * Resolve `prev` or `next` config from frontmatter
 */
const resolveFromFrontmatterConfig = (
  conf: unknown
): null | false | NavLinkType => {
  if (conf === false) return null;

  if (isString(conf)) return useNavLink(conf);

  if (isPlainObject<NavLinkType>(conf)) return conf;

  return false;
};

/**
 * Resolve `prev` or `next` config from sidebar items
 */
const resolveFromSidebarItems = (
  sidebarItems: ResolvedSidebarItem[],
  currentPath: string,
  offset: number
): null | NavLinkType => {
  const index = sidebarItems.findIndex((item) => item.link === currentPath);

  if (index !== -1) {
    const targetItem = sidebarItems[index + offset];

    if (!targetItem?.link) return null;

    return targetItem as NavLinkType;
  }

  for (const item of sidebarItems)
    if (item.children) {
      const childResult = resolveFromSidebarItems(
        item.children,
        currentPath,
        offset
      );

      if (childResult) return childResult;
    }

  return null;
};

export default defineComponent({
  name: "PageNav",

  components: {
    NavLink,
    NextIcon,
    PrevIcon,
  },

  setup() {
    const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
    const sidebarItems = useSidebarItems();
    const route = useRoute();

    const prevNavLink = computed(() => {
      const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev);

      return prevConfig !== false
        ? prevConfig
        : resolveFromSidebarItems(sidebarItems.value, route.path, -1);
    });

    const nextNavLink = computed(() => {
      const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next);

      return nextConfig !== false
        ? nextConfig
        : resolveFromSidebarItems(sidebarItems.value, route.path, 1);
    });

    return (): VNode | null =>
      prevNavLink.value || nextNavLink.value
        ? h(
            "nav",
            { class: "page-nav" },
            h("p", { class: "inner" }, [
              prevNavLink.value
                ? h("span", { class: "prev" }, [
                    h(PrevIcon),
                    h(NavLink, { item: prevNavLink.value }),
                  ])
                : null,
              nextNavLink.value
                ? h("span", { class: "next" }, [
                    h(NavLink, { item: nextNavLink.value }),
                    h(NextIcon),
                  ])
                : null,
            ])
          )
        : null;
  },
});
