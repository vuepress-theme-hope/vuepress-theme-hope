import { defineComponent, h } from "vue";
import AutoLink from "../AutoLink";
import RepoLink from "../RepoLink";
import SidebarDropdownLink from "./SidebarDropdownLink";
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
            ...navbarConfig.value.map((config) =>
              h(
                "div",
                { class: "navbar-links-item" },
                "children" in config
                  ? h(SidebarDropdownLink, { config })
                  : h(AutoLink, { config })
              )
            ),
            h(RepoLink),
          ])
        : null;
  },
});
