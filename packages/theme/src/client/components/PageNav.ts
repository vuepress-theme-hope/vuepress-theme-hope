import { usePageFrontmatter } from "@vuepress/client";
import { isPlainObject, isString } from "@vuepress/shared";
import { computed, defineComponent, h, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

import AutoLink from "@theme-hope/components/AutoLink";
import {
  useAutoLink,
  useIconPrefix,
  useNavigate,
  useThemeLocaleData,
} from "@theme-hope/composables";
import { useSidebarItems } from "@theme-hope/module/sidebar/composables";

import type { VNode } from "vue";
import type {
  HopeThemeNormalPageFrontmatter,
  AutoLink as AutoLinkType,
  ResolvedSidebarItem,
} from "../../shared";

import "../styles/page-nav.scss";

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
    const themeLocale = useThemeLocaleData();
    const iconPrefix = useIconPrefix();
    const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
    const sidebarItems = useSidebarItems();
    const route = useRoute();
    const navigate = useNavigate();

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

    const keyboardListener = (event: KeyboardEvent): void => {
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
    };

    onMounted(() => {
      window.addEventListener("keydown", keyboardListener);
    });

    onUnmounted(() => {
      window.removeEventListener("keydown", keyboardListener);
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
                      prevNavLink.value?.icon
                        ? h("i", {
                            class: `icon ${iconPrefix.value}${prevNavLink.value.icon}`,
                          })
                        : null,
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
                      nextNavLink.value?.icon
                        ? h("i", {
                            class: `icon ${iconPrefix.value}${nextNavLink.value.icon}`,
                          })
                        : null,
                    ]),
                  ]
                )
              : null,
          ])
        : null;
  },
});
