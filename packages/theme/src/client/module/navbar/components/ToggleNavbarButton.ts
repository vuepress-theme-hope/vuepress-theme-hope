import { h } from "vue";

import type { FunctionalComponent, VNode } from "vue";

import "../styles/toggle-navbar-button.scss";

export interface ToggleNavbarButtonProps {
  active?: boolean;
}

const ToggleNavbarButton: FunctionalComponent<
  ToggleNavbarButtonProps,
  { toggle: () => void }
> = ({ active = false }, { emit }): VNode =>
  h(
    "button",
    {
      class: ["toggle-navbar-button", { "is-active": active }],
      "aria-label": "Toggle Navbar",
      "aria-expanded": active,
      "aria-controls": "nav-screen",
      onClick: () => emit("toggle"),
    },
    h("span", { class: "button-container" }, [
      h("span", { class: "button-top" }),
      h("span", { class: "button-middle" }),
      h("span", { class: "button-bottom" }),
    ])
  );

ToggleNavbarButton.displayName = "ToggleNavbarButton";

export default ToggleNavbarButton;
