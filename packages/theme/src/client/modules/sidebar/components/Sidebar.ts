import type { SlotsType, VNode } from "vue";
import { defineComponent, h, onMounted, shallowRef, watch } from "vue";
import { useRoute } from "vuepress/client";

import { useThemeLocaleData } from "@theme-hope/composables/index";
import SidebarLinks from "@theme-hope/modules/sidebar/components/SidebarLinks";
import { useSidebarItems } from "@theme-hope/modules/sidebar/composables/index";

import "../styles/sidebar.scss";

export default defineComponent({
  name: "SideBar",

  slots: Object as SlotsType<{
    default?: () => VNode[] | VNode | null;
    top?: () => VNode[] | VNode | null;
    bottom?: () => VNode[] | VNode | null;
  }>,

  setup(_props, { slots }) {
    const route = useRoute();
    const themeLocale = useThemeLocaleData();
    const sidebarItems = useSidebarItems();

    const sidebar = shallowRef<HTMLElement>();

    onMounted(() => {
      // Scroll to active sidebar item
      watch(
        () => route.hash,
        (hash): void => {
          // Get the active sidebar item DOM, whose href equals to the current route
          const activeSidebarItem = document.querySelector(
            `.vp-sidebar a.vp-sidebar-link[href="${route.path}${hash}"]`,
          );

          if (!activeSidebarItem) return;

          // Get the top and height of the sidebar
          const { top: sidebarTop, height: sidebarHeight } =
            sidebar.value!.getBoundingClientRect();
          // Get the top and height of the active sidebar item
          const { top: activeSidebarItemTop, height: activeSidebarItemHeight } =
            activeSidebarItem.getBoundingClientRect();

          // When the active sidebar item overflows the top edge of sidebar
          if (activeSidebarItemTop < sidebarTop)
            // Scroll to the top edge of sidebar
            activeSidebarItem.scrollIntoView(true);
          // When the active sidebar item overflows the bottom edge of sidebar
          else if (
            activeSidebarItemTop + activeSidebarItemHeight >
            sidebarTop + sidebarHeight
          )
            // Scroll to the bottom edge of sidebar
            activeSidebarItem.scrollIntoView(false);
        },
        { immediate: true },
      );
    });

    return (): VNode =>
      h(
        "aside",
        {
          ref: sidebar,
          id: "sidebar",
          class: [
            "vp-sidebar",
            { "hide-icon": themeLocale.value.sidebarIcon === false },
          ],
          key: "sidebar",
        },
        [
          slots.top?.(),
          slots.default?.() || h(SidebarLinks, { config: sidebarItems.value }),
          slots.bottom?.(),
        ],
      );
  },
});
