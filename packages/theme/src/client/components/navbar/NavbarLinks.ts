import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import AutoLink from "@theme-hope/components/base/AutoLink";
import NavbarDropdown from "@theme-hope/components/navbar/NavbarDropdown";
import { useNavbarItems } from "@theme-hope/composables/navbar/useNavbarItems";

import "../../styles/navbar/navbar-links.scss";

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
                  ? h(NavbarDropdown, { config })
                  : h(AutoLink, { config, iconSizing: "height" }),
              ),
            ),
          )
        : null;
  },
});
