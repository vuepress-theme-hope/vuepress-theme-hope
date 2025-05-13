import type { FunctionalComponent, VNode } from "vue";
import { h } from "vue";

import "../../styles/navbar/toggle-navbar-button.scss";

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
      type: "button",
      class: ["vp-toggle-navbar-button", { "is-active": active }],
      "aria-label": "Toggle Navbar",
      "aria-expanded": active,
      "aria-controls": "nav-screen",
      onClick: () => {
        emit("toggle");
      },
    },
    h("span", [
      h("span", { class: "vp-top" }),
      h("span", { class: "vp-middle" }),
      h("span", { class: "vp-bottom" }),
    ]),
  );

ToggleNavbarButton.displayName = "ToggleNavbarButton";

export default ToggleNavbarButton;
