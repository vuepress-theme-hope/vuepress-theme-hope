import { defineComponent, h } from "vue";

import SidebarNavLinks from "@theme-hope/module/sidebar/components/SidebarNavLinks";
import SidebarLinks from "@theme-hope/module/sidebar/components/SidebarLinks";
import { useSidebarItems } from "@theme-hope/module/sidebar/composables";

import type { VNode } from "vue";

import "../styles/index.scss";

export default defineComponent({
  name: "SideBar",

  setup(_props, { slots }) {
    const sidebarItems = useSidebarItems();

    return (): VNode =>
      h("aside", { class: "sidebar" }, [
        h(SidebarNavLinks),
        slots.top?.(),
        h(SidebarLinks, { config: sidebarItems.value }),
        slots.bottom?.(),
      ]);
  },
});
