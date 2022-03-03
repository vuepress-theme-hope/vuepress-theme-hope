import { defineComponent, h, resolveComponent } from "vue";

import LanguageDropdown from "@theme-hope/module/navbar/components/LanguageDropdown";
import RepoLink from "@theme-hope/module/navbar/components/RepoLink";
import OutlookButton from "@theme-hope/module/outlook/components/OutlookButton";
import ToggleNavbarButton from "@theme-hope/module/navbar/components/ToggleNavbarButton";

import type { VNode } from "vue";

import "../styles/navbar-actions.scss";

export default defineComponent({
  name: "NavActions",

  props: {
    showScreen: { type: Boolean, default: false },
  },

  emits: ["toggleScreen"],

  setup(props, { emit, slots }) {
    return (): VNode | null =>
      h("div", { class: "nav-actions-wrapper" }, [
        slots.before?.(),
        h("div", { class: "nav-item" }, h(LanguageDropdown)),
        h(RepoLink),
        h(OutlookButton),
        h(resolveComponent("NavbarSearch")),
        h(ToggleNavbarButton, {
          active: props.showScreen,
          onToggle: () => emit("toggleScreen"),
        }),
        slots.after?.(),
      ]);
  },
});
