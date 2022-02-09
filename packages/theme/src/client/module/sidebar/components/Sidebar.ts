import { defineComponent, h } from "vue";

import SidebarLinks from "@theme-hope/module/sidebar/components/SidebarLinks";
import { useSidebarItems } from "@theme-hope/module/sidebar/composables";

import type { VNode } from "vue";

import "../styles/sidebar.scss";

export default defineComponent({
  name: "SideBar",

  setup(_props, { slots }) {
    const sidebarItems = useSidebarItems();

    return (): VNode =>
      h("aside", { class: "sidebar" }, [
        slots.top?.(),
        h(SidebarLinks, { config: sidebarItems.value }),
        slots.bottom?.(),
      ]);
  },
});
