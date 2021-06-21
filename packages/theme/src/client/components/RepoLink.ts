import { defineComponent, h } from "vue";
import NavLink from "./NavLink";
import { useNavbarRepo } from "../composables";

import type { VNode } from "vue";

export default defineComponent({
  name: "RepoLink",

  setup() {
    const repo = useNavbarRepo();

    return (): VNode | null =>
      repo.value
        ? h(NavLink, {
            class: "repo-link",
            item: repo.value,
          })
        : null;
  },
});
