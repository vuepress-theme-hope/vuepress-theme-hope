import { defineComponent, h } from "vue";

import AutoLink from "@theme-hope/components/AutoLink.js";
import NavScreenDropdown from "@theme-hope/modules/navbar/components/NavScreenDropdown.js";
import { useNavbarConfig } from "@theme-hope/modules/navbar/composables/index.js";

import type { VNode } from "vue";

import "../styles/nav-screen-links.scss";

export default defineComponent({
  name: "NavScreenLinks",

  setup() {
    const navbarConfig = useNavbarConfig();

    return (): VNode | null =>
      navbarConfig.value.length
        ? h(
            "nav",
            { class: "nav-screen-links" },
            navbarConfig.value.map((config) =>
              h(
                "div",
                { class: "navbar-links-item" },
                "children" in config
                  ? h(NavScreenDropdown, { config })
                  : h(AutoLink, { config })
              )
            )
          )
        : null;
  },
});
