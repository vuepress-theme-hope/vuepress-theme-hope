import { h } from "vue";

import type { FunctionalComponent, VNode } from "vue";

import "../styles/toggle-sidebar-button.scss";

const ToggleSidebarButton: FunctionalComponent<
  Record<string, never>,
  { toggle: () => void }
> = (_, { emit }): VNode =>
  h(
    "button",
    {
      class: "toggle-sidebar-button",
      title: "Toggle Sidebar",
      onClick: () => emit("toggle"),
    },
    h("span", { class: "icon" })
  );

ToggleSidebarButton.displayName = "ToggleSidebarButton";

ToggleSidebarButton.emits = ["toggle"];

export default ToggleSidebarButton;
