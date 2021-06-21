import { defineComponent, h } from "vue";
import NavLink from "../NavLink";
import RepoLink from "../RepoLink";
import SidebarDropdownLink from "./DropdownLink.vue";
import { useNavbarConfig, useNavbarRepo } from "../../composables";

import type { VNode } from "vue";

export default defineComponent({
  name: "SidebarNavLinks",

  setup() {
    const navbarConfig = useNavbarConfig();
    const navbarRepo = useNavbarRepo();

    return (): VNode | null =>
      navbarConfig.value.length || navbarRepo.value
        ? h("nav", { class: "sidebar-nav-links" }, [
            ...navbarConfig.value.map((item) =>
              h(
                "div",
                { class: "navbar-links-item" },
                "children" in item
                  ? h(SidebarDropdownLink, { item })
                  : h(NavLink, { item })
              )
            ),
            h(RepoLink),
          ])
        : null;
  },
});
