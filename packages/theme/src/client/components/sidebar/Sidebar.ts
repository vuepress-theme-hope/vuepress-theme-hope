import { defineComponent, h } from "vue";
import { useSidebarItems } from "../../composables";
import SidebarNavLinks from "./SidebarNavLinks";
import SidebarLinks from "./SidebarLinks";

import type { VNode } from "vue";

import "./styles/index.scss";

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
