import type { Slot } from "@vuepress/helper/client";
import { watchImmediate } from "@vueuse/core";
import type { SlotsType, VNode } from "vue";
import { defineComponent, h, onMounted, shallowRef } from "vue";
import { useRoute } from "vuepress/client";

import SidebarLinks from "@theme-hope/components/sidebar/SidebarLinks";
import { useSidebarItems } from "@theme-hope/composables/sidebar/useSidebarItems";
import type { SidebarItemsSlotData } from "@theme-hope/typings/slots";

import "../../styles/sidebar/sidebar.scss";

export default defineComponent({
  name: "SideBar",

  slots: Object as SlotsType<{
    sidebarItems?: Slot<SidebarItemsSlotData>;
    sidebarTop?: Slot;
    sidebarBottom?: Slot;
  }>,

  setup(_props, { slots }) {
    const route = useRoute();
    const sidebarItems = useSidebarItems();

    const sidebar = shallowRef<HTMLElement>();

    onMounted(() => {
      // Scroll to active sidebar item
      watchImmediate(
        () => route.hash,
        (hash): void => {
          // Get the active sidebar item DOM, whose href equals to the current route
          const activeSidebarItem = document.querySelector(
            `.vp-sidebar a.vp-sidebar-link[href="${route.path}${hash}"]`,
          );

          if (!activeSidebarItem) return;

          // Get the top and height of the sidebar
          const { top: sidebarTop, height: sidebarHeight } =
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
      );
    });

    return (): VNode =>
      h(
        "aside",
        {
          ref: sidebar,
          key: "sidebar",
          id: "sidebar",
          class: "vp-sidebar",
          "vp-sidebar": "",
        },
        [
          slots.sidebarTop?.(),
          slots.sidebarItems?.(sidebarItems.value) ??
            h(SidebarLinks, { config: sidebarItems.value }),
          slots.sidebarBottom?.(),
        ],
      );
  },
});
