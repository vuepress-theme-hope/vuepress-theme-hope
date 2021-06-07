import { defineComponent, h } from "vue";
import { useNavbarConfig } from "../../composables";
import DropdownLink from "./DropdownLink.vue";
import NavLink from "../NavLink.vue";

import type { VNode } from "vue";

export default defineComponent({
  name: "NavbarLinks",

  components: {
    DropdownLink,
    NavLink,
  },

  setup() {
    const navbarConfig = useNavbarConfig();

    return (): VNode | null =>
      navbarConfig.value.length
        ? h(
            "nav",
            { class: "nav-links" },
            navbarConfig.value.map((item) =>
              h(
                "div",
                { class: "nav-item" },
                "children" in item
                  ? h(DropdownLink, { item })
                  : h(NavLink, { item })
              )
            )
          )
        : null;
  },
});
