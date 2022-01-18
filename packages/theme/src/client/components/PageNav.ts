import { computed, defineComponent, h } from "vue";
import { useRoute } from "vue-router";
import { usePageFrontmatter } from "@vuepress/client";
import { isPlainObject, isString } from "@vuepress/shared";
import AutoLink from "./AutoLink";
import { PrevIcon, NextIcon } from "./icons";
import { useAutoLink, useSidebarItems } from "../composables";

import type { VNode } from "vue";
import type {
  HopeThemeNormalPageFrontmatter,
  AutoLink as AutoLinkType,
  ResolvedSidebarItem,
} from "../../shared";

/**
 * Resolve `prev` or `next` config from frontmatter
 */
const resolveFromFrontmatterConfig = (
  conf: unknown
): null | false | AutoLinkType => {
  if (conf === false) return null;

  if (isString(conf)) return useAutoLink(conf);

  if (isPlainObject<AutoLinkType>(conf)) return conf;

  return false;
};

/**
 * Resolve `prev` or `next` config from sidebar items
 */
const resolveFromSidebarItems = (
  sidebarItems: ResolvedSidebarItem[],
  currentPath: string,
  offset: number
): null | AutoLinkType => {
  const index = sidebarItems.findIndex((item) => item.link === currentPath);

  if (index !== -1) {
    const targetItem = sidebarItems[index + offset];

    if (!targetItem?.link) return null;

    return targetItem as AutoLinkType;
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
                    h(AutoLink, { config: prevNavLink.value }),
                  ])
                : null,
              nextNavLink.value
                ? h("span", { class: "next" }, [
                    h(AutoLink, { config: nextNavLink.value }),
                    h(NextIcon),
                  ])
                : null,
            ])
          )
        : null;
  },
});
