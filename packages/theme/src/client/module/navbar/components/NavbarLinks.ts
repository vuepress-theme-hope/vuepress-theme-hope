import { defineComponent, h } from "vue";

import AutoLink from "@theme-hope/components/AutoLink";
import DropdownLink from "@theme-hope/module/navbar/components/DropdownLink";
import { useNavbarConfig } from "@theme-hope/module/navbar/composables";

import type { VNode } from "vue";

import "../styles/navbar-links.scss";

export default defineComponent({
  name: "NavbarLinks",

  setup() {
    const navbarConfig = useNavbarConfig();

    return (): VNode | null =>
      navbarConfig.value.length
        ? h("nav", { class: "nav-links" }, [
            ...navbarConfig.value.map((config) =>
              h(
                "div",
                { class: "nav-item hide-in-mobile" },
                "children" in config
                  ? h(DropdownLink, { config })
                  : h(AutoLink, { config })
              )
            ),
          ])
        : null;
  },
});
