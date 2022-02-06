import { defineComponent, h } from "vue";

import AutoLink from "@theme-hope/components/AutoLink";
import SidebarDropdownLink from "@theme-hope/module/sidebar/components/SidebarDropdownLink";
import { useNavbarConfig } from "@theme-hope/module/navbar/composables";

import type { VNode } from "vue";

import "../styles/nav-links.scss";

export default defineComponent({
  name: "SidebarNavLinks",

  setup() {
    const navbarConfig = useNavbarConfig();

    return (): VNode | null =>
      navbarConfig.value.length
        ? h(
            "nav",
            { class: "sidebar-nav-links" },
            navbarConfig.value.map((config) =>
              h(
                "div",
                { class: "navbar-links-item" },
                "children" in config
                  ? h(SidebarDropdownLink, { config })
                  : h(AutoLink, { config })
              )
            )
          )
        : null;
  },
});
