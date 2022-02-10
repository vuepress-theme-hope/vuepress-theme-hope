import { defineComponent, h } from "vue";

import type { VNode } from "vue";

import "../styles/toggle-navbar-button.scss";

export default defineComponent({
  name: "ToggleNavbarButton",

  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["toggle"],

  setup(props, { emit }) {
    return (): VNode =>
      h(
        "button",
        {
          class: ["toggle-navbar-button", { "is-active": props.active }],
          "aria-label": "Toggle Navbar",
          "aria-expanded": props.active,
          "aria-controls": "nav-screen",
          onClick: () => emit("toggle"),
        },
        h("span", { class: "button-container" }, [
          h("span", { class: "button-top" }),
          h("span", { class: "button-middle" }),
          h("span", { class: "button-bottom" }),
        ])
      );
  },
});
