import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import AutoLink from "@theme-hope/components/AutoLink";
import DropdownLink from "@theme-hope/modules/navbar/components/DropdownLink";
import { useNavbarItems } from "@theme-hope/modules/navbar/composables/index";

import "../styles/navbar-links.scss";

export default defineComponent({
  name: "NavbarLinks",

  setup() {
    const navbarConfig = useNavbarItems();

    return (): VNode | null =>
      navbarConfig.value.length
        ? h(
            "nav",
            { class: "vp-nav-links" },
            navbarConfig.value.map((config) =>
              h(
                "div",
                { class: "vp-nav-item hide-in-mobile" },
                "children" in config
                  ? h(DropdownLink, { config })
                  : h(AutoLink, { config }),
              ),
            ),
          )
        : null;
  },
});
