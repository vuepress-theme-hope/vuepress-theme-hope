import { defineComponent, h } from "vue";

import type { VNode } from "vue";

import "../styles/toggle-sidebar-button.scss";

export default defineComponent({
  name: "ToggleSidebarButton",

  emits: ["toggle"],

  setup(_props, { emit }) {
    return (): VNode =>
      h(
        "button",
        {
          class: "toggle-sidebar-button",
          title: "Toggle Sidebar",
          onClick: () => emit("toggle"),
        },
        h("span", { class: "icon" })
      );
  },
});
