import { defineComponent, h, onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";

import { useThemeLocaleData } from "@theme-hope/composables";
import SidebarLinks from "@theme-hope/module/sidebar/components/SidebarLinks";
import { useSidebarItems } from "@theme-hope/module/sidebar/composables";

import type { VNode } from "vue";

import "../styles/sidebar.scss";

export default defineComponent({
  name: "SideBar",

  setup(_props, { slots }) {
    const route = useRoute();
    const themeLocale = useThemeLocaleData();
    const sidebarItems = useSidebarItems();
    const sidebar = ref<HTMLElement | null>(null);

    onMounted(() => {
      // scroll to active sidebar item
      watch(
        () => route.hash,
        (hash): void => {
          // get the active sidebar item DOM, whose href equals to the current route
          const activeSidebarItem = document.querySelector(
            `.sidebar a.sidebar-link[href="${route.path}${hash}"]`
          );

          if (!activeSidebarItem) return;

          // get the top and height of the sidebar
          const { top: sidebarTop, height: sidebarHeight } =
            sidebar.value!.getBoundingClientRect();
          // get the top and height of the active sidebar item
          const { top: activeSidebarItemTop, height: activeSidebarItemHeight } =
            activeSidebarItem.getBoundingClientRect();

          // when the active sidebar item overflows the top edge of sidebar
          if (activeSidebarItemTop < sidebarTop)
            // scroll to the top edge of sidebar
            activeSidebarItem.scrollIntoView(true);
          // when the active sidebar item overflows the bottom edge of sidebar
          else if (
            activeSidebarItemTop + activeSidebarItemHeight >
            sidebarTop + sidebarHeight
          )
            // scroll to the bottom edge of sidebar
            activeSidebarItem.scrollIntoView(false);
        }
      );
    });

    return (): VNode =>
      h(
        "aside",
        {
          class: ["sidebar", { "hide-icon": !themeLocale.value.sidebarIcon }],
          ref: sidebar,
        },
        [
          slots["top"]?.(),
          slots["default"]?.() ||
            h(SidebarLinks, { config: sidebarItems.value }),
          slots["bottom"]?.(),
        ]
      );
  },
});
