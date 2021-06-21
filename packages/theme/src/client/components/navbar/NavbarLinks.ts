import { defineComponent, h } from "vue";
import { useNavbarConfig } from "../../composables";
import DropdownLink from "./DropdownLink.vue";
import LanguageDropdown from "./LanguageDropdown";
import NavLink from "../NavLink";
import RepoLink from "../RepoLink";

import type { VNode } from "vue";

export default defineComponent({
  name: "NavbarLinks",

  setup() {
    const navbarConfig = useNavbarConfig();

    return (): VNode | null =>
      navbarConfig.value.length
        ? h("nav", { class: "nav-links" }, [
            ...navbarConfig.value.map((item) =>
              h(
                "div",
                { class: ["nav-item", "hide-in-mobile"] },
                "children" in item
                  ? h(DropdownLink, { item })
                  : h(NavLink, { item })
              )
            ),
            h("div", { class: ["nav-item"] }, h(LanguageDropdown)),
            h("div", { class: ["nav-item", "hide-in-mobile"] }, h(RepoLink)),
          ])
        : null;
  },
});
