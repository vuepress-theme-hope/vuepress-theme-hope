import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import { useThemeLocale } from "@theme-hope/composables/useTheme";

import "../../styles/navbar/toggle-sidebar-button.scss";

export default defineComponent({
  name: "ToggleSidebarButton",

  props: {
    /**
     * Whether the mobile sidebar is open
     *
     * 移动端侧边栏是否打开
     */
    active: Boolean,
  },

  emits: ["toggle"],

  setup(props, { emit }) {
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
          "aria-expanded": props.active,
          onClick: () => {
            emit("toggle");
          },
        },
        h("span", { class: "icon" }),
      );
  },
});
