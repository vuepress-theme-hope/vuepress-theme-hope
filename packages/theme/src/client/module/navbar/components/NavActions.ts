import { defineComponent, h, resolveComponent } from "vue";

import LanguageDropdown from "@theme-hope/module/navbar/components/LanguageDropdown";
import RepoLink from "@theme-hope/module/navbar/components/RepoLink";
import OutlookButton from "@theme-hope/module/navbar/components/OutlookButton";

import type { VNode } from "vue";

import "../styles/navbar-actions.scss";

export default defineComponent({
  name: "NavActions",

  setup(_props, { slots }) {
    return (): VNode | null =>
      h("div", { class: "nav-actions-wrapper" }, [
        slots.before?.(),
        h("div", { class: ["nav-item"] }, h(LanguageDropdown)),
        h("div", { class: ["nav-item"] }, h(RepoLink)),
        h(OutlookButton),
        h(resolveComponent("NavbarSearch")),
        slots.after?.(),
      ]);
  },
});
