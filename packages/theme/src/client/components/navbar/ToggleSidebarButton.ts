import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import { useThemeLocale } from "@theme-hope/composables/useTheme";

import "../../styles/navbar/toggle-sidebar-button.scss";

export default defineComponent({
  name: "ToggleSidebarButton",

  emits: ["toggle"],

  setup(_props, { emit }) {
    const themeLocale = useThemeLocale();

    return (): VNode =>
      h(
        "button",
        {
          type: "button",
          class: "vp-toggle-sidebar-button",
          title: themeLocale.value.navbarLocales.toggleSidebar ?? "Toggle sidebar",
          "aria-label": themeLocale.value.navbarLocales.toggleSidebar ?? "Toggle sidebar",
          "aria-controls": "sidebar",
          onClick: () => {
            emit("toggle");
          },
        },
        h("span", { class: "icon" }),
      );
  },
});
