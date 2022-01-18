import { defineComponent, h } from "vue";
import AutoLink from "./AutoLink";
import { useNavbarRepo } from "../composables";

import type { VNode } from "vue";

export default defineComponent({
  name: "RepoLink",

  setup() {
    const repo = useNavbarRepo();

    return (): VNode | null =>
      repo.value
        ? h(AutoLink, {
            class: "repo-link",
            config: repo.value,
          })
        : null;
  },
});
