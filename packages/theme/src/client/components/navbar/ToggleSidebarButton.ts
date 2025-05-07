import type { FunctionalComponent, VNode } from "vue";
import { h } from "vue";

import "../../styles/navbar/toggle-sidebar-button.scss";

const ToggleSidebarButton: FunctionalComponent<
  { onToggle: () => void },
  { toggle: () => void }
> = (_, { emit }): VNode =>
  h(
    "button",
    {
      type: "button",
      class: "vp-toggle-sidebar-button",
      title: "Toggle Sidebar",
      onClick: () => {
        emit("toggle");
      },
    },
    h("span", { class: "icon" }),
  );

ToggleSidebarButton.displayName = "ToggleSidebarButton";

ToggleSidebarButton.emits = ["toggle"];

export default ToggleSidebarButton;
