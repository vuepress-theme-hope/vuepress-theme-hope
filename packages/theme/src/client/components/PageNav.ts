import { usePageFrontmatter } from "@vuepress/client";
import { isPlainObject, isString } from "@vuepress/shared";
import { useEventListener } from "@vueuse/core";
import { computed, defineComponent, h } from "vue";
import { useRoute } from "vue-router";

import AutoLink from "@theme-hope/components/AutoLink.js";
import Icon from "@theme-hope/components/Icon.js";
import {
  useAutoLink,
  useNavigate,
  useThemeLocaleData,
} from "@theme-hope/composables/index.js";
import { useSidebarItems } from "@theme-hope/modules/sidebar/composables/index.js";

import type { VNode } from "vue";
import type {
  HopeThemeNormalPageFrontmatter,
  AutoLink as AutoLinkType,
  ResolvedSidebarItem,
} from "../../shared/index.js";

import "../styles/page-nav.scss";

/**
 * Resolve `prev` or `next` config from frontmatter
 */
const resolveFromFrontmatterConfig = (
  conf: unknown
): null | false | AutoLinkType => {
  if (conf === false) return false;

  if (isString(conf)) return useAutoLink(conf, true);

  if (isPlainObject<AutoLinkType>(conf)) return conf;

  return null;
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
    const themeLocale = useThemeLocaleData();
    const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
    const sidebarItems = useSidebarItems();
    const route = useRoute();
    const navigate = useNavigate();

    const prevNavLink = computed(() => {
      const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev);

      return prevConfig === false
        ? null
        : prevConfig ||
            (themeLocale.value.prevLink === false
              ? null
              : resolveFromSidebarItems(sidebarItems.value, route.path, -1));
    });

    const nextNavLink = computed(() => {
      const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next);

      return nextConfig === false
        ? null
        : nextConfig ||
            (themeLocale.value.nextLink === false
              ? null
              : resolveFromSidebarItems(sidebarItems.value, route.path, 1));
    });

    useEventListener("keydown", (event): void => {
      if (event.altKey) {
        if (event.key === "ArrowRight") {
          if (nextNavLink.value) {
            navigate(nextNavLink.value.link);
            event.preventDefault();
          }
        } else if (event.key === "ArrowLeft") {
          if (prevNavLink.value) {
            navigate(prevNavLink.value.link);
            event.preventDefault();
          }
        }
      }
    });

    return (): VNode | null =>
      prevNavLink.value || nextNavLink.value
        ? h("nav", { class: "page-nav" }, [
            prevNavLink.value
              ? h(
                  AutoLink,
                  { class: "prev", config: prevNavLink.value },
                  () => [
                    h("div", { class: "hint" }, [
                      h("span", { class: "arrow left" }),
                      themeLocale.value.metaLocales.prev,
                    ]),
                    h("div", { class: "link" }, [
                      h(Icon, {
                        icon: prevNavLink.value?.icon,
                      }),
                      prevNavLink.value?.text,
                    ]),
                  ]
                )
              : null,
            nextNavLink.value
              ? h(
                  AutoLink,
                  { class: "next", config: nextNavLink.value },
                  () => [
                    h("div", { class: "hint" }, [
                      themeLocale.value.metaLocales.next,
                      h("span", { class: "arrow right" }),
                    ]),
                    h("div", { class: "link" }, [
                      nextNavLink.value?.text,
                      h(Icon, {
                        icon: nextNavLink.value?.icon,
                      }),
                    ]),
                  ]
                )
              : null,
          ])
        : null;
  },
});
