import { defineComponent, h } from "vue";

import AutoLink from "@theme-hope/components/AutoLink.js";
import DropdownLink from "@theme-hope/modules/navbar/components/DropdownLink.js";
import { useNavbarConfig } from "@theme-hope/modules/navbar/composables/index.js";

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
