import { defineComponent, h } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables";
import SidebarLinks from "@theme-hope/module/sidebar/components/SidebarLinks";
import { useSidebarItems } from "@theme-hope/module/sidebar/composables";

import type { VNode } from "vue";

import "../styles/sidebar.scss";

export default defineComponent({
  name: "SideBar",

  setup(_props, { slots }) {
    const themeLocale = useThemeLocaleData();
    const sidebarItems = useSidebarItems();

    return (): VNode =>
      h(
        "aside",
        { class: ["sidebar", { "hide-icon": !themeLocale.value.sidebarIcon }] },
        [
          slots.top?.(),
          slots.default?.() || h(SidebarLinks, { config: sidebarItems.value }),
          slots.bottom?.(),
        ]
      );
  },
});
